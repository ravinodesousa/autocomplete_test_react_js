import React from "react";
import { useRecoilValue } from "recoil";
import { autocompleteResults } from "../store/atom";
import "../styles/SearchResult.css";

function SearchResult() {
  const searchResult = useRecoilValue(autocompleteResults);

  const ArtistResult = ({ data }) => {
    return (
      <div className="search-result-container">
        Artist Name: <b>{data?.artistName}</b> <br />
        Albums:
        <ol>
          {data?.albums?.map((album) => {
            return (
              <>
                <li>
                  Name: <b>{album?.title}</b>
                </li>
                Songs:
                <ul>
                  {album?.songs?.map((song) => {
                    return (
                      <li>
                        {song?.title} ({song?.length})
                      </li>
                    );
                  })}
                </ul>
              </>
            );
          })}
        </ol>
      </div>
    );
  };

  const AlbumResult = ({ data }) => {
    return (
      <div className="search-result-container">
        Artist Name: <b>{data?.artistName}</b> <br />
        Album Name: <b>{data?.album?.title}</b> <br />
        Songs:
        <ul>
          {data?.album?.songs?.map((song) => {
            return (
              <li>
                {song?.title} ({song?.length})
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const SongResult = ({ data }) => {
    return (
      <div className="search-result-container">
        Artist Name: <b>{data?.artistName}</b> <br />
        Album Name: <b>{data?.albumName}</b> <br />
        Song Name:{" "}
        <b>
          {data?.song?.title} ({data?.song?.length})
        </b>{" "}
        <br />
      </div>
    );
  };

  if (searchResult) {
    if (searchResult?.type == "artist") {
      return <ArtistResult data={searchResult} />;
    }

    if (searchResult?.type == "album") {
      return <AlbumResult data={searchResult} />;
    }

    if (searchResult?.type == "song") {
      return <SongResult data={searchResult} />;
    }
  }
  return <></>;
}

export default SearchResult;
