import React from 'react'

function SearchForm() {
  return (
    <form>
        
        <Autocomplete
            options={["one","two", "three"]}
            renderInput={(params) => <TextField {...params} label="From" />} />
      <label>From:
        <input
          type="text" 
          
        />
      </label>
      <label>To:
        <input
          
        />
      </label>
      <label>Departure:
        <input
          type="text" 
          
        />
      </label>
    </form>
  )
}

export default SearchForm