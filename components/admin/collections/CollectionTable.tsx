import CollectionRow from "./CollectionRow";
import type { CollectionListItem } from "@/lib/actions/collection.actions";

interface CollectionTableProps {
  collections: CollectionListItem[];
}

export default function CollectionTable({ collections }: CollectionTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr className="text-left">
            <th className="px-6 py-4 font-semibold">Collection</th>
            <th className="px-6 py-4 font-semibold">Slug</th>
            <th className="px-6 py-4 font-semibold">Categories</th>
            <th className="px-6 py-4 font-semibold">Products</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Created</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {collections.map((collection) => (
            <CollectionRow key={collection.id} collection={collection} />
          ))}
        </tbody>
      </table>
    </div>
  );
}