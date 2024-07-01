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

  //  {"artistName":"Taylor Swift","albums":[{"title":"Fearless","songs":[{"title":"Fearless","length":"4:01"},{"title":"Fifteen","length":"4:54"},{"title":"Love Story","length":"3:55"},{"title":"Hey Stephen","length":"4:14"},{"title":"White Horse","length":"3:55"},{"title":"You Belong with Me","length":"3:52"},{"title":"Breathe","length":"4:23"},{"title":"Tell Me Why","length":"3:20"},{"title":"You're Not Sorry","length":"4:22"},{"title":"The Way I Loved You","length":"4:04"},{"title":"Forever & Always","length":"3:46"},{"title":"The Best Day","length":"4:05"},{"title":"Change","length":"4:40"}],"description":"\n\tFearless is the second studio album by American singer-songwriter Taylor Swift. It was released on November 11, 2008, by Big Machine Records. The album was a commercial success, topping the Billboard 200 for 11 non-consecutive weeks. It was also the best-selling album of 2009 in the United States. Fearless has been certified Diamond by the Recording Industry Association of America (RIAA) and has sold over 10 million copies worldwide. It won four Grammy Awards, including Album of the Year, making Swift the youngest recipient of the award at the time.\n "},{"title":"1989","songs":[{"title":"Welcome to New York","length":"3:32"},{"title":"Blank Space","length":"3:51"},{"title":"Style","length":"3:51"},{"title":"Out of the Woods","length":"3:55"},{"title":"All You Had to Do Was Stay","length":"3:13"},{"title":"Shake It Off","length":"3:39"},{"title":"I Wish You Would","length":"3:27"},{"title":"Bad Blood","length":"3:31"},{"title":"Wildest Dreams","length":"3:40"},{"title":"How You Get the Girl","length":"4:07"},{"title":"This Love","length":"4:10"},{"title":"I Know Places","length":"3:15"},{"title":"Clean","length":"4:31"}],"description":"\n\t1989 is the fifth studio album by American singer-songwriter Taylor Swift. It was released on October 27, 2014, through Big Machine Records. The album marked a departure from the country music that had been Swift's trademark sound, and is described as her evolution into pop music. 1989 received generally positive reviews from music critics and was a commercial success, debuting at number one on the Billboard 200 and selling over 1.28 million copies in its first week. It has since been certified 9× Platinum by the RIAA and has sold over 10 million copies worldwide.\n "}],"type":"artist"}
}

export default SearchResult;
