import Breadcrumbs from "@/components/admin/layout/Breadcrumbs";
import PageHeader from "@/components/admin/ui/PageHeader";
import CollectionForm from "@/components/admin/collections/CollectionForm";

export default function NewCollectionPage() {
  return (
    <div>
      <Breadcrumbs />
      <PageHeader
        title="Add Collection"
        description="Create a new collection for your store."
      />
      <CollectionForm />
    </div>
  );
}