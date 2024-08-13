import styled from 'styled-components';

export default function SearchBar({ searchInput, onSearch }) {
  function handleChange(event) {
    onSearch(event.target.value);
  }

  return (
    <SearchInput
      type="text"
      value={searchInput}
      placeholder="🔎 Search exercises... "
      onChange={handleChange}
    />
  );
}

const SearchInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  display: block;
  width:65vw;
  background-color: var(--light-orange);
  border: none;
  border-radius: 0.5rem;
  height: 2.5rem;
`;
