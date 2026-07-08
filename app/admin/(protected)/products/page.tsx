import Link from "next/link";
import { getProducts } from "@/lib/actions/product.actions";
import ProductTable from "@/components/admin/products/ProductTable";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-500 mt-1">
            Showing {products.length} product
            {products.length !== 1 ? "s" : ""}
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="rounded-lg bg-[#C99A2E] px-4 py-2 text-white hover:bg-[#B88B24] transition"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <h2 className="text-xl font-semibold">No products found</h2>
          <p className="mt-2 text-gray-500">
            Create your first product to start selling.
          </p>

          <Link
            href="/admin/products/new"
            className="mt-6 inline-block rounded-lg bg-[#C99A2E] px-4 py-2 text-white hover:bg-[#B88B24]"
          >
            Add Product
          </Link>
        </div>
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
}