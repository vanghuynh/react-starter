import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/search_bar";
const API_KEY = "xxx";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import _ from "lodash";

// create a new component. this component should produce some HTML
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { videos: [], selectedVideo: null };
    this.videoSearch("redux");
  }

  videoSearch(term) {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${term}&type=video&part=snippet&maxResults=5`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ videos: json.items, selectedVideo: json.items[0] });
      });
  }
  render() {
    const videoSearch = _.debounce((term) => {
      this.videoSearch(term);
    }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={(selectedVideo) => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

// take this component's generated HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector(".container"));
