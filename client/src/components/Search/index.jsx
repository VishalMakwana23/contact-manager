import { Input } from "../Input";

export function Search({ search, onChangeSearch }) {
  return (
    <Input
      onChange={onChangeSearch}
      value={search}
      placeholder="
Search contact..."
    />
  );
}
