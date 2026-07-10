import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/admin/layout/Breadcrumbs";
import PageHeader from "@/components/admin/ui/PageHeader";
import ProductForm from "@/components/admin/products/ProductForm";
import { getCollections, getCategories, getProductById } from "@/lib/actions/product.actions";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) {
    notFound();
  }

  const [product, collections, categories] = await Promise.all([
    getProductById(productId),
    getCollections(),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <Breadcrumbs />
      <PageHeader
        title="Edit Product"
        description="Update product information."
      />
      <ProductForm
        mode="edit"
        product={product}
        collections={collections}
        categories={categories}
      />
    </div>
  );
}