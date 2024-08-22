import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import plus from "src/assets/add-notes.svg";
import AttachFileIcon from "src/components/icons/AttachFileIcon";
import TagIcon from "src/components/icons/TagIcon";
import SpinnerLoader from "src/components/LoadingScreens/SpinnerLoader";
import "src/components/notes/sub_components/create_notes/CreateNotes.css";
import RichTextEditor from "src/components/notes/sub_components/create_notes/subComponents/RichTextEditor";
import TagsInput from "src/components/notes/sub_components/create_notes/subComponents/TagsInput";
import { errorToast, successToast } from "src/components/toasters/toast.js";
import { createNoteThunk, updateNoteThunk } from "src/store/thunks/notesThunk";
import { encryptArrayValues, encryptObjectValues } from "src/utils/encryptionUtil";

const CreateNotes = ({
    handleCreateNotesClick,
    setCreateNotesClicked,
    setNotesArray,
    noteDetails,
    setNoteDetails,
    handleUpdateClick,
    update = false,
    notesArray,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [spinner, setSpinner] = useState(false);
    const [attachLinkClicked, setAttachLinkClicked] = useState(false);
    const [showLinkPopup, setShowLinkPopup] = useState(false);
    const handleShowLinkPopup = () => setShowLinkPopup(true);

    const handleAttachLinkClick = () => {
      setAttachLinkClicked((prevValue) => !prevValue);
      if (!attachLinkClicked) {
          handleShowLinkPopup();
      }
  };

    const handleCloseLinkPopup = () => {
        setShowLinkPopup(false);
        handleAttachLinkClick();
    };

    const [addTagClicked, setAddTagClicked] = useState(update ? true : false);

    const handleAddTagClick = () => {
      setAddTagClicked((prevValue) => !prevValue);
  };

    const handleNoteInputChange = (event) => {
        const { value, name } = event.target;

      if (name === "links") {
          setNoteDetails((prev) => ({ ...prev, links: [...prev.links, value] }));
      } else {
          setNoteDetails((prev) => ({ ...prev, [name]: value }));
      }
  };

    const handleTitleChange = (event) => {
        const { value } = event.target;
      setNoteDetails((prev) => ({ ...prev, title: value }));
  };

    const extractHrefFromAnchors = (htmlString) => {
        const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");
      const anchorTags = doc.querySelectorAll("a");
      return Array.from(anchorTags).map((anchor) => anchor.href);
  };

    const removeDuplicateLinks = (linksArray) => {
        return [...new Set(linksArray)];
    };
    const handleCreateClick = async () => {
        setSpinner(true);
        try {
        const linksInDesc = extractHrefFromAnchors(noteDetails.desc);
        let uniqueLinks = removeDuplicateLinks(linksInDesc);
            const splitDesc = noteDetails.desc.match(/.{1,32}/g);
            // Encrypt the split description array
            const encryptedDesc = encryptArrayValues(splitDesc);
        setNoteDetails((prev) => ({
            ...prev,
          links: uniqueLinks,
      }));
        console.log("before encryption===========>", noteDetails);
        const forEncryption = {
            title: noteDetails.title,
        };
        const encryptedTaskDetails = encryptObjectValues(forEncryption);
        console.log("encrypted ones", encryptedTaskDetails);
        const updatedTaskDetails = {
            ...noteDetails,
          title: encryptedTaskDetails?.title,
            desc: encryptedDesc,
          links: uniqueLinks,
      };
            console.log('Updated Tasksssssssssssss', updatedTaskDetails)

        const thunkToDispatch = update
            ? updateNoteThunk(updatedTaskDetails)
            : createNoteThunk(updatedTaskDetails);
            const response = await dispatch(thunkToDispatch).unwrap();
        console.log("rrrrrrrrrrrrrr", response);
        if (response.status === 201) {
            updatedTaskDetails._id = response?.data?._id;
          const obj = { ...noteDetails, links: uniqueLinks };
          {
              !update && setNotesArray((prev) => [obj, ...prev]);
          }
          successToast(response.message, "task-created");
          {
              update ? navigate(-1) : setCreateNotesClicked(false);
          }
      } else {
            errorToast("Something went wrong", "authentication-pages-error");
            {
                update ? "" : setCreateNotesClicked(false);
            }
        }
        setSpinner(false);
        {
            update ? "" : setCreateNotesClicked(false);
        }
    } catch (error) {
        setSpinner(false);

          console.error("Error occurred while dispatching thunk:", error);
          errorToast(error.message, "authentication-pages-error");
          {
              update ? "" : setCreateNotesClicked(false);
          }
      }
  };

    return (
      <div className='add-notes-page'>
          <SpinnerLoader showSpinner={spinner} />
          <div className='add-notes-header-div'>
              <div className='add-notes-header'>
                  {!update && (
                      <div>
                          <img src={plus} alt='plus-sign' />
                      </div>
                  )}
                  <div>{update ? "View or Update" : "Add Note"}</div>
              </div>
          </div>
          <form className='add-notes-input-fields'>
              <div className='add-notes-input-title'>
                  <div
                      style={{
                          fontSize: "16px",
                          fontFamily: "var(--secondary-font-family)",
                          color: "var(--secondary-font-color)",
                          fontWeight: "500",
                      }}
                  >
                      Title
                  </div>
                  <input
                      type='text'
                      name='title'
                      placeholder='Enter title here'
                      className='create-notes-input'
                      onChange={handleTitleChange}
                      value={noteDetails.title}
                  />
              </div>
              <div className='add-notes-input-details'>
                  <RichTextEditor
                      showLinkPopup={showLinkPopup}
                      handleShowLinkPopup={handleShowLinkPopup}
                      handleCloseLinkPopup={handleCloseLinkPopup}
                      handleAttachLinkClick={handleAttachLinkClick}
                      handleNoteInputChange={handleNoteInputChange}
                      value={noteDetails.desc}
                  />
                  <div className='note-attachments-div'>
                      <div
                          className='note-attachments note-attachments-a'
                          onClick={handleAttachLinkClick}
                          style={{
                              color: attachLinkClicked && "var(--primary-background-color)",
                              backgroundColor:
                                  attachLinkClicked && "var(--active-background-color)",
                          }}
                      >
                          <AttachFileIcon
                              color={
                                  attachLinkClicked
                                      ? "var(--primary-background-color)"
                                      : "var(--tertiary-font-color)"
                              }
                          />
                          <div>Attach Link</div>
                      </div>
                      <div
                          className='note-attachments note-attachments-b'
                          onClick={handleAddTagClick}
                          style={{
                              color: addTagClicked && "var(--primary-background-color)",
                              backgroundColor:
                                  addTagClicked && "var(--active-background-color)",
                          }}
                      >
                          <TagIcon
                              color={
                                  addTagClicked
                                      ? "var(--primary-background-color)"
                                      : "var(--tertiary-font-color)"
                              }
                          />
                          Add Tag
                      </div>
                      {addTagClicked && (
                          <TagsInput
                              handleNoteInputChange={handleNoteInputChange}
                              value={noteDetails.tags}
                          />
                      )}
                  </div>
              </div>
          </form>
          <div className='add-notes-controls'>
              <button
                  className='filter-button'
                  style={{
              width: "120px",
              backgroundColor: "var(--neutral-background-color)",
              border: "1px solid var(--field-border-color)",
              color: "var(--tertiary-font-color)",
          }}
                  onClick={() => {
                      if (update) {
                          navigate(-1);
                      } else {
                          setCreateNotesClicked(false);
                      }
                  }}
              >
                  {update ? "Close" : "Cancel"}
              </button>
              <button
                  className='primary-button'
                  onClick={handleCreateClick}
                  style={{ width: "135px", gap: "0px" }}
              >
                  {update ? "Update Note" : "Save Note"}
              </button>
          </div>
      </div>
  );
};

export default CreateNotes;
