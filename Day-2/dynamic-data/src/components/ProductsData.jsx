import {
  Box,
  Button,
  Grid,
  Heading,
  Img,
  Text,
  Stack,
  Select,
  Input,
  VStack,
  HStack,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThLarge, FaList } from "react-icons/fa";

export default function ProductsData() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [view, setView] = useState("card");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      const itemsPerPage = 5;
      setData(res.data);
      setFilteredData(res.data);
      setTotalPages(Math.ceil(res.data.length / itemsPerPage));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    handleFilters();
  }, [sort, filter, search, page]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const isToggleHandle = () => {
    setToggle(!toggle);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleFilters = () => {
    let updatedData = [...data];

    if (search) {
      updatedData = updatedData.filter((item) =>
        item.title.toLowerCase().includes(search)
      );
    }

    if (filter) {
      updatedData = updatedData.filter((item) => item.category === filter);
    }

    if (sort) {
      updatedData.sort((a, b) => {
        if (sort === "priceAsc") return a.price - b.price;
        if (sort === "priceDesc") return b.price - a.price;
        if (sort === "nameAsc") return a.title.localeCompare(b.title);
        if (sort === "nameDesc") return b.title.localeCompare(a.title);
        return 0;
      });
    }

    setFilteredData(updatedData);
    setTotalPages(Math.ceil(updatedData.length / 5));
  };

  const itemsPerPage = 5;
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        align="center"
        mb={4}
      >
        <Button onClick={isToggleHandle}>{toggle ? "Hide" : "Show"}</Button>
        <Button onClick={handlePrev} disabled={page === 1}>
          Prev
        </Button>
        <Text>{page}</Text>
        <Button onClick={handleNext} disabled={page === totalPages}>
          Next
        </Button>
        <Select placeholder="Sort By" onChange={handleSortChange}>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </Select>
        <Select placeholder="Filter By Category" onChange={handleFilterChange}>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </Select>
        <Input placeholder="Search" onChange={handleSearchChange} />
        <HStack>
          <IconButton
            icon={<FaThLarge />}
            isActive={view === "card"}
            onClick={() => setView("card")}
          />
          <IconButton
            icon={<FaList />}
            isActive={view === "list"}
            onClick={() => setView("list")}
          />
        </HStack>
      </Stack>
      {toggle &&
        (view === "card" ? (
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "1fr 1fr",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
            bg="lightgray"
          >
            {paginatedData.map((ele) => (
              <Box key={ele.id} border="1px solid black" padding={4} bg="ivory">
                <Heading size="md" mb={2}>
                  {ele.title}
                </Heading>
                <Img
                  src={ele.image}
                  alt={ele.title}
                  boxSize="200px"
                  objectFit="cover"
                  mb={2}
                />
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  ${ele.price}
                </Text>
                <Text noOfLines={2} mb={2}>
                  {ele.description}
                </Text>
                <Text fontStyle="italic">{ele.category}</Text>
              </Box>
            ))}
          </Grid>
        ) : (
          <VStack spacing={4} bg="lightgray">
            {paginatedData.map((ele) => (
              <Box
                key={ele.id}
                border="1px solid black"
                padding={4}
                width="100%"
                bg="ivory"
              >
                <Flex align="center">
                  <Img
                    src={ele.image}
                    alt={ele.title}
                    boxSize="100px"
                    objectFit="cover"
                    mr={4}
                  />
                  <Box>
                    <Heading size="md" mb={2}>
                      {ele.title}
                    </Heading>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                      ${ele.price}
                    </Text>
                    <Text noOfLines={2} mb={2}>
                      {ele.description}
                    </Text>
                    <Text fontStyle="italic">{ele.category}</Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </VStack>
        ))}
    </>
  );
}
