import videoHomepage from "../../assets/video-homepage.mp4";
const HomePage = (props) => {
  return (
    <div className="homepage-container">
      HomePage components
      {/* Theo trải nghiệm người dùng nên muốn video tự chạy
       khi load web thì cần thêm autoPlay + muted */}
      <video width="500" height="500" autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="main-title"> There's a better way to ask</div>
        <div className="content-title">
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead-and make everyon happy
        </div>
        <div className="getStarted-button">
          <button>Get's started. It's free</button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
