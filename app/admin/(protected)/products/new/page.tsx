import Breadcrumbs from "@/components/admin/layout/Breadcrumbs";
import PageHeader from "@/components/admin/ui/PageHeader";
import ProductForm from "@/components/admin/products/ProductForm";
import { getCollections, getCategories } from "@/lib/actions/product.actions";

export default async function NewProductPage() {
  const [collections, categories] = await Promise.all([
    getCollections(),
    getCategories(),
  ]);

  return (
    <div>
      <Breadcrumbs />
      <PageHeader
        title="Add Product"
        description="Create a new product for your store."
      />
      <ProductForm collections={collections} categories={categories} />
    </div>
  );
}