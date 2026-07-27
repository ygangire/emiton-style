"use server";

import { prisma } from "@/lib/prisma/client";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Supported image formats
const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export interface MediaErrors {
  file?: string;
  altText?: string;
}

export interface MediaFormState {
  errors?: MediaErrors;
  message?: string;
}

// Get all media with optional search and folder filter
export async function getMedia(search?: string, folder?: string) {
  const where: {
    OR?: Array<{
      filename?: { contains: string; mode: "insensitive" };
      originalName?: { contains: string; mode: "insensitive" };
      altText?: { contains: string; mode: "insensitive" };
    }>;
    folder?: string;
    isActive?: boolean;
  } = {
    isActive: true,
  };

  if (search) {
    where.OR = [
      { filename: { contains: search, mode: "insensitive" } },
      { originalName: { contains: search, mode: "insensitive" } },
      { altText: { contains: search, mode: "insensitive" } },
    ];
  }

  if (folder) {
    where.folder = folder;
  }

  return await prisma.media.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get media by ID
export async function getMediaById(id: string) {
  return await prisma.media.findUnique({
    where: { id },
  });
}

// Search media
export async function searchMedia(query: string) {
  return await getMedia(query);
}

// Get media count for dashboard
export async function getMediaCount() {
  return await prisma.media.count({
    where: { isActive: true },
  });
}

// Upload media to Vercel Blob and store metadata
export async function uploadMedia(
  prevState: MediaFormState | undefined,
  formData: FormData
): Promise<MediaFormState> {
  const file = formData.get("file") as File;
  const altText = formData.get("altText") as string;
  const folder = (formData.get("folder") as string) || "general";

  const errors: MediaErrors = {};

  // Validate file exists
  if (!file || file.size === 0) {
    errors.file = "Please select a file to upload.";
    return { errors };
  }

  // Validate file type
  if (!SUPPORTED_FORMATS.includes(file.type)) {
    errors.file = "Unsupported file format. Supported formats: JPG, JPEG, PNG, WebP.";
    return { errors };
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    errors.file = "File size exceeds 10MB limit.";
    return { errors };
  }

  try {
    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `media_${timestamp}.${extension}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
    });

    // Get image dimensions (for images)
    let width: number | undefined;
    let height: number | undefined;

    if (file.type.startsWith("image/")) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const dimensions = await getImageDimensions(buffer);
      width = dimensions.width;
      height = dimensions.height;
    }

    // Store metadata in database
    await prisma.media.create({
      data: {
        filename,
        originalName: file.name,
        url: blob.url,
        altText: altText?.trim() || undefined,
        mimeType: file.type,
        extension,
        size: file.size,
        width,
        height,
        folder,
      },
    });

    revalidatePath("/admin/media");
    return { message: "Media uploaded successfully." };
  } catch (error) {
    console.error("Upload error:", error);
    return { errors: { file: "Failed to upload file. Please try again." } };
  }
}

// Update media metadata
export async function updateMedia(
  prevState: MediaFormState | undefined,
  formData: FormData
): Promise<MediaFormState> {
  const id = formData.get("id") as string;
  const altText = formData.get("altText") as string;
  const folder = formData.get("folder") as string;
  const isActive = formData.has("isActive");

  if (!id) {
    return { errors: { file: "Invalid media ID." } };
  }

  try {
    await prisma.media.update({
      where: { id },
      data: {
        altText: altText?.trim() || undefined,
        folder: folder?.trim() || "general",
        isActive,
      },
    });

    revalidatePath("/admin/media");
    return { message: "Media updated successfully." };
  } catch {
    return { errors: { file: "Failed to update media. Please try again." } };
  }
}

// Delete media
export async function deleteMedia(id: string): Promise<{ error?: string }> {
  if (!id) {
    return { error: "Invalid media ID." };
  }

  const media = await prisma.media.findUnique({
    where: { id },
  });

  if (!media) {
    return { error: "Media not found." };
  }

  try {
    // Delete from Vercel Blob
    await del(media.url);

    // Delete from database
    await prisma.media.delete({
      where: { id },
    });

    revalidatePath("/admin/media");
    return {};
  } catch (error) {
    console.error("Delete error:", error);
    return { error: "Failed to delete media. Please try again." };
  }
}

// Replace image
export async function replaceMedia(
  prevState: MediaFormState | undefined,
  formData: FormData
): Promise<MediaFormState> {
  const id = formData.get("id") as string;
  const file = formData.get("file") as File;

  const errors: MediaErrors = {};

  if (!id) {
    return { errors: { file: "Invalid media ID." } };
  }

  if (!file || file.size === 0) {
    errors.file = "Please select a file to upload.";
    return { errors };
  }

  // Validate file type
  if (!SUPPORTED_FORMATS.includes(file.type)) {
    errors.file = "Unsupported file format. Supported formats: JPG, JPEG, PNG, WebP.";
    return { errors };
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    errors.file = "File size exceeds 10MB limit.";
    return { errors };
  }

  const existingMedia = await prisma.media.findUnique({
    where: { id },
  });

  if (!existingMedia) {
    return { errors: { file: "Media not found." } };
  }

  try {
    // Delete old blob
    await del(existingMedia.url);

    // Upload new file
    const timestamp = Date.now();
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `media_${timestamp}.${extension}`;

    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
    });

    // Get image dimensions
    let width: number | undefined;
    let height: number | undefined;

    if (file.type.startsWith("image/")) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const dimensions = await getImageDimensions(buffer);
      width = dimensions.width;
      height = dimensions.height;
    }

    // Update database
    await prisma.media.update({
      where: { id },
      data: {
        filename,
        originalName: file.name,
        url: blob.url,
        mimeType: file.type,
        extension,
        size: file.size,
        width,
        height,
      },
    });

    revalidatePath("/admin/media");
    return { message: "Media replaced successfully." };
  } catch (error) {
    console.error("Replace error:", error);
    return { errors: { file: "Failed to replace media. Please try again." } };
  }
}

// Helper function to get image dimensions
async function getImageDimensions(buffer: Buffer): Promise<{ width: number; height: number }> {
  // Simple dimension detection for common formats
  // For production, you might want to use sharp or similar library
  try {
    // PNG
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
      return {
        width: buffer.readUInt32BE(16),
        height: buffer.readUInt32BE(20),
      };
    }

    // JPEG
    if (buffer[0] === 0xff && buffer[1] === 0xd8) {
      // Simplified - in production use sharp for accurate dimensions
      return { width: 0, height: 0 };
    }

    // WebP
    if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) {
      return {
        width: buffer.readUInt32BE(24),
        height: buffer.readUInt32BE(26),
      };
    }

    return { width: 0, height: 0 };
  } catch {
    return { width: 0, height: 0 };
  }
}