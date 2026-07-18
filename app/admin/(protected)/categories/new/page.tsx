import Breadcrumbs from "@/components/admin/layout/Breadcrumbs";
import PageHeader from "@/components/admin/ui/PageHeader";
import CategoryForm from "@/components/admin/categories/CategoryForm";
import { getCollections } from "@/lib/actions/category.actions";

export default async function NewCategoryPage() {
  const collections = await getCollections();

  return (
    <div>
      <Breadcrumbs />
      <PageHeader
        title="Add Category"
        description="Create a new category for your store."
      />
      <CategoryForm collections={collections} />
    </div>
  );
}