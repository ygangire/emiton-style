import { Suspense } from "react";
import PageHeader from "@/components/admin/ui/PageHeader";
import Breadcrumbs from "@/components/admin/layout/Breadcrumbs";
import MediaGrid from "@/components/admin/media/MediaGrid";
import MediaGridSkeleton from "@/components/admin/media/MediaGridSkeleton";
import MediaUploader from "@/components/admin/media/MediaUploader";
import MediaToolbar from "@/components/admin/media/MediaToolbar";
import { getMedia, type MediaSortOption } from "@/lib/actions/media.actions";

interface MediaPageProps {
  searchParams: Promise<{ search?: string; sort?: string; page?: string }>;
}

const ITEMS_PER_PAGE = 24;

export default async function MediaPage({ searchParams }: MediaPageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const sort = (params.sort as MediaSortOption) || "newest";
  const page = Number(params.page) || 1;

  const media = await getMedia(search, undefined, sort);

  // Calculate pagination
  const totalItems = media.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedMedia = media.slice(startIndex, endIndex);

  return (
    <div>
      <Breadcrumbs />
      <PageHeader
        title="Media Library"
        description="Manage all media assets for your store."
      />

      <div className="space-y-6">
        <MediaUploader />

        <MediaToolbar search={search} sort={sort} />

        <div className="flex items-center justify-between text-sm text-gray-500">
          <p>
            Showing {paginatedMedia.length} of {totalItems} items
          </p>
        </div>

        <Suspense fallback={<MediaGridSkeleton />}>
          <MediaGrid media={paginatedMedia} />
        </Suspense>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <a
                  key={pageNum}
                  href={`?search=${search}&sort=${sort}&page=${pageNum}`}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                    pageNum === page
                      ? "bg-[#C89B3C] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </a>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}