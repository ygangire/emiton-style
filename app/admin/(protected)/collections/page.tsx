import Link from "next/link";
import { getCollections } from "@/lib/actions/collection.actions";
import CollectionTable from "@/components/admin/collections/CollectionTable";

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Collections</h1>
          <p className="text-gray-500 mt-1">
            Showing {collections.length} collection
            {collections.length !== 1 ? "s" : ""}
          </p>
        </div>

        <Link
          href="/admin/collections/new"
          className="rounded-lg bg-[#C99A2E] px-4 py-2 text-white hover:bg-[#B88B24] transition"
        >
          + Add Collection
        </Link>
      </div>

      {collections.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <h2 className="text-xl font-semibold">No collections found</h2>
          <p className="mt-2 text-gray-500">
            Create your first collection to organise your products.
          </p>

          <Link
            href="/admin/collections/new"
            className="mt-6 inline-block rounded-lg bg-[#C99A2E] px-4 py-2 text-white hover:bg-[#B88B24]"
          >
            Add Collection
          </Link>
        </div>
      ) : (
        <CollectionTable collections={collections} />
      )}
    </div>
  );
}