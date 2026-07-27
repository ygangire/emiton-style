import { Suspense } from "react";
import PageHeader from "@/components/admin/ui/PageHeader";
import Breadcrumbs from "@/components/admin/layout/Breadcrumbs";
import MediaGrid from "@/components/admin/media/MediaGrid";
import MediaUploader from "@/components/admin/media/MediaUploader";
import MediaToolbar from "@/components/admin/media/MediaToolbar";
import { getMedia } from "@/lib/actions/media.actions";

interface MediaPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function MediaPage({ searchParams }: MediaPageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const media = await getMedia(search);

  return (
    <div>
      <Breadcrumbs />
      <PageHeader
        title="Media Library"
        description="Manage all media assets for your store."
      />

      <div className="space-y-6">
        <MediaUploader />

        <MediaToolbar search={search} onSearchChange={() => {}} />

        <Suspense fallback={<div>Loading media...</div>}>
          <MediaGrid media={media} />
        </Suspense>
      </div>
    </div>
  );
}