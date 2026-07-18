import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/admin/layout/Breadcrumbs";
import PageHeader from "@/components/admin/ui/PageHeader";
import CategoryForm from "@/components/admin/categories/CategoryForm";
import { getCategoryById, getCollections } from "@/lib/actions/category.actions";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;
  const categoryId = Number(id);

  if (isNaN(categoryId)) {
    notFound();
  }

  const [category, collections] = await Promise.all([
    getCategoryById(categoryId),
    getCollections(),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <Breadcrumbs />
      <PageHeader
        title="Edit Category"
        description="Edit category details."
      />
      <CategoryForm mode="edit" category={category} collections={collections} />
    </div>
  );
}