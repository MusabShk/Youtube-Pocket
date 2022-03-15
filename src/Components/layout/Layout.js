import React, { useState } from "react";
import { StyledEngineProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../navbar/Navbar";
import AuthUser from "../context";
const Layout = (props) => {
  const [youtubeSearch, setYoutubeSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingBar, setLoadingBar] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [categories, setCategories] = useState([]);
  return (
    <>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <AuthUser.Provider
          value={{
            youtubeSearch: youtubeSearch,
            setYoutubeSearch: setYoutubeSearch,
            loading: loading,
            setLoading: setLoading,
            searchResult: searchResult,
            setSearchResult: setSearchResult,
            categories: categories,
            setCategories: setCategories,
            loadingBar: loadingBar,
            setLoadingBar: setLoadingBar,
          }}
        >
          <Navbar />
          <main>{props.children}</main>
        </AuthUser.Provider>
      </StyledEngineProvider>
    </>
  );
};

export default Layout;
