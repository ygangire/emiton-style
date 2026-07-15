import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/admin/layout/Breadcrumbs";
import PageHeader from "@/components/admin/ui/PageHeader";
import CollectionForm from "@/components/admin/collections/CollectionForm";
import { getCollectionById } from "@/lib/actions/collection.actions";

interface EditCollectionPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCollectionPage({ params }: EditCollectionPageProps) {
  const { id } = await params;
  const collectionId = Number(id);

  if (isNaN(collectionId)) {
    notFound();
  }

  const collection = await getCollectionById(collectionId);

  if (!collection) {
    notFound();
  }

  return (
    <div>
      <Breadcrumbs />
      <PageHeader
        title="Edit Collection"
        description="Edit collection details."
      />
      <CollectionForm mode="edit" collection={collection} />
    </div>
  );
}