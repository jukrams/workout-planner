import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';

export default function SearchBar({ searchInput, onSearch }) {
  function handleChange(event) {
    onSearch(event.target.value);
  }

  function handleClear() {
    onSearch(''); 
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
      {searchInput && <ClearIcon onClick={handleClear} />}
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

const ClearIcon = styled(FaTimes)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: var(--dark-brown);
  font-size: 1.2rem;
  cursor: pointer;
`;

const SearchInput = styled.input`
  padding: 0.5rem 2.5rem 0.5rem 2.5rem; 
  font-size: 1rem;
  width: 100%;
  background-color: var(--light-orange);
  border: none;
  border-radius: 0.5rem;
  height: 2.5rem;
`;
