import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ searchInput, onSearch }) {
  function handleChange(event) {
    onSearch(event.target.value);
  }

  return (
    <SearchInputWrapper>
      <SearchIcon />
      <SearchInput
        type="text"
        value={searchInput}
        placeholder="Search your exercise"
        onChange={handleChange}
      />
    </SearchInputWrapper>
  );
}


const SearchInputWrapper = styled.div`
  position: relative;
  width: 65vw;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: var(--dark-gray);
  font-size: 1.5rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem 0.5rem 0.5rem 2.5rem;  // Adjust padding to make space for the icon
  font-size: 1rem;
  width: 100%;
  background-color: var(--light-orange);
  border: none;
  border-radius: 0.5rem;
  height: 2.5rem;
`;

