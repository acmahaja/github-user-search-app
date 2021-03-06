import "../css/profile.css";

export const Profile = ({ data }) => {
  const formatDate = (joinDate) => {
    const monthList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(joinDate);
    return `${date.getDay()} ${
      monthList[date.getMonth()]
    } ${date.getFullYear()}`;
  };
  console.log(data);

  return (
    <main className="useBorderBox">
      <img src={data.avatar_url} alt="user-profile-pic" id="desktop" />
      <article className="useBorderBox">
        <section id="profile">
          <img src={data.avatar_url} alt="user-profile-pic" />
          <div id="user">
            <div id="name">
              <h1>{data.name}</h1>
              <h3>@{data.login}</h3>
            </div>
            <p id="join">Joined {formatDate(data.created_at)}</p>
          </div>
        </section>
        <section id="bio">{data.bio}</section>
        <section className="useBorderBox" id="stats">
          <div className="stat">
            <p>Repos</p>
            <h2>{data.public_repos}</h2>
          </div>
          <div className="stat">
            <p>Followers</p>
            <h2>{data.followers}</h2>
          </div>
          <div className="stat">
            <p>Following</p>
            <h2>{data.following}</h2>
          </div>
        </section>
        <section id="links" className="useBorderBox">
          <div className={`link ${data.location === null ? "disable" : null}`}>
            <div alt="location icon" className="icon" id="location"></div>
            <p>{data.location === null ? "Not Available" : data.location}</p>
          </div>

          <div className={`link ${data.blog === "" ? "disable" : null}`}>
            <div alt="blog icon" className="icon" id="blog"></div>
            <a href={data.blog === "" ? "#" : data.blog}>
              {data.blog === "" ? "Not Available" : data.blog}
            </a>
          </div>

          <div
            className={`link ${
              data.twitter_username === null ? "disable" : null
            }`}
          >
            <div alt="twitter icon" className="icon" id="twitter"></div>
            <a
              href={
                data.twitter_username === null
                  ? "#"
                  : `https://www.twitter.com/${data.twitter_username}`
              }
            >
              {data.twitter_username === null ? "Not Available" : data.twitter_username}
            </a>
          </div>

          <div className={`link ${data.company === null ? "disable" : null}`}>
            <div alt="company icon" className="icon" id="company"></div>
            <p>{data.company === null ? "Not Available" : data.company}</p>
          </div>

        </section>
      </article>
    </main>
  );
};

export default Profile;
