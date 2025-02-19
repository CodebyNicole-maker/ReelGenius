//Todo: Import RecsContainer from RecsContainer
//Todo: Import styles as needed
//Todo: Import OMDBcontainer to fetch movie data
import OmdbContainer from "../OMDBcontainer";

//Todo: Create a container to display OMDBContainer data
function MovieModal() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button variant="primary" onClick={toggle}>
        Send
      </Button>
      <MyModal isOpen={isOpen} toggle={toggle}>
        <p>This is the content.</p>
      </MyModal>
    </div>
  );
}

//Todo: Stylize the container to match the wireframe

//Todo: Add Recscontainer to display movie recommendations

//Todo: Add like buttons to add to User's favorite movies

//Todo: HTML for exporting the MovieModal component

//Todo: export MovieModal
export default MovieModal;
