import React, { useEffect, useState } from "react";
import { CardsData } from "../data";
import Card from "./Card";

const AllCards = () => {
  const [cards, setCards] = useState(CardsData);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loadedCards, setLoadedCards] = useState([]);
  const [pageDetils, setPageDetails] = useState({
    page: 1,
    perPage: 10,
    total: 0,
  });

  const [search, setSearch] = useState('')

  const [filterType, setFilterType] = useState(1)

  const setViewCards = () => {
    console.log(pageDetils);
    let addCards = cards.slice(
      (pageDetils.page - 1) * pageDetils.perPage,
      (pageDetils.page - 1) * pageDetils.perPage + pageDetils.perPage
    );
    // console.log("chala",addCards)
    setLoadedCards([...loadedCards, ...addCards]);
  };

  const filterData = (data) => {
    let type = filterType
    if (type == 2 || type == 3) {
      let filteringValue = type == 2 ? "burner" : "subscription";
      let filterArr = data? data: loadedCards
      let filteredData = filterArr.filter(
        (ele) => ele.card_type == filteringValue
      );
      console.log(filteredData);
      setFilteredCards(filteredData);
    } else {
      setFilteredCards(data?data:loadedCards);
    }
  };

  const searchData = () =>{
    console.log(filteredCards);
    if(search === ''){
      filterData()
    }else{
      let newSearchData = loadedCards.filter(ele=> ele.name.toLowerCase().includes(search.toLowerCase()))
      filterData(newSearchData)
    }
   
  }

  useEffect(() => {
    console.log("chala");
    setViewCards();
  }, [cards, pageDetils]);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page
      if (
        window.innerHeight + document.documentElement.scrollTop 
        + 20 >=
        document.documentElement.offsetHeight
      ) {
        console.log("iuhygfhyg");
        setPageDetails((prev) => ({ ...prev, page: prev.page + 1 }));
      }
    };

    // Add the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    searchData();
  }, [loadedCards,filterType,search]);

  const onselectChange = (e) => {
    let { value } = e.target;
    setFilterType(value)
  };
  

  return (
    <div>
      <div>
        <select name="" id="" onChange={onselectChange}>
          <option value="1">All</option>
          <option value="2">Burner</option>
          <option value="3">Subscription</option>
        </select>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder ="search" />
      </div>

      {filteredCards.map((ele,i) => {
        return <Card key={i} data={ele} onclick={()=>console.log(ele)} />;
      })}
    </div>
  );
};

export default AllCards;
