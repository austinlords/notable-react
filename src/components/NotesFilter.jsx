import React, { Component, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCaretRight,
  faCaretDown,
  faUserCircle,
  faBook,
  faTags,
  faEdit,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import FilterCollectionsEdit from "./FilterCollectionsEdit";
import randomColor from "./../utils/randomColor";

class NotesFilter extends Component {
  state = {
    colorPopoverOpen: false,
    editMode: false,
    editCollections: [],
    colorChange: ""
  };

  toggleEditMode = () => {
    const currentCollections = [...this.props.collections];
    if (!this.state.editMode) {
      this.setState({ editMode: true, editCollections: currentCollections });
    } else {
      let collectionsToUpdate = this.state.editCollections.filter(
        (c, index) => {
          return (
            c.name !== currentCollections[index].name ||
            c.color !== currentCollections[index].color
          );
        }
      );
      collectionsToUpdate.forEach(c => this.props.updateCollections(c, "edit"));
      this.setState({ editMode: !this.state.editMode });
    }
  };

  handleCollectionDelete = event => {
    const collectionId = event.currentTarget.getAttribute("data");
    let allCollections = [...this.props.collections];

    let collection = allCollections.filter(c => c._id === collectionId);
    this.props.updateCollections(collection[0], "delete");
  };

  handleCollectionChange = (collection, index, event) => {
    const editCollections = [...this.state.editCollections];
    const collectionToUpdate = { ...collection };
    collectionToUpdate.name = event.currentTarget.value;
    editCollections.splice(index, 1, collectionToUpdate);

    this.setState({ editCollections });
  };

  handleColorChange = (color, event) => {
    this.setState({ colorChange: color.hex });
  };

  filterStyle = {
    display: "grid",
    gridTemplateRows: "40px 60px 200px 300px",
    overflow: "auto",
    padding: "15px 5px",
    height: "100%",
    width: "100%"
  };

  collectionTagStyle = {
    marginTop: "10px",
    color: "white"
  };

  dropdownTitle = {
    display: "grid",
    gridTemplateColumns: "15px auto",
    width: "100%",
    alignItems: "baseline"
  };

  render() {
    const {
      handleDropdownClick,
      handleRadioSelect,
      handleCheckboxSelect,
      collectionsOpen,
      tagsOpen,
      collectionFilter,
      tagsFilter,
      collections,
      tags
    } = this.props;

    return (
      <div id="filterSection" style={this.filterStyle} className="bg-dark-blue">
        <ProfileWidget />
        <CollectionButtons updateCollections={this.props.updateCollections} />

        <div id="collection-filter" style={this.collectionTagStyle}>
          <div className="list-group clickable">
            <div
              style={this.dropdownTitle}
              onClick={e => handleDropdownClick(e)}
              data-toggle="collapse"
              data-target="#collections"
              aria-expanded={collectionsOpen}
              aria-controls="collections"
            >
              <FontAwesomeIcon
                icon={collectionsOpen ? faCaretDown : faCaretRight}
                className="faCaretDropdown"
              />
              <div>
                <span>Collections </span>
                <span style={{ paddingLeft: "10px" }}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faBook}
                    style={{ fontSize: "14px", transform: "rotate(-20deg)" }}
                  />
                </span>
              </div>
            </div>
          </div>
          <div
            className="collapse multi-collapse show"
            id="collections"
            style={{
              marginLeft: "10px",
              fontSize: "14px",
              height: "95%",
              overflow: "auto"
            }}
          >
            {this.state.editMode ? (
              <div></div>
            ) : (
              <div key="allCollections" className="form-check clickable">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="collection-choices"
                    value=""
                    checked={collectionFilter === ""}
                    onChange={e => handleRadioSelect(e)}
                  />
                  All
                </label>
              </div>
            )}
            {this.state.editMode ? (
              <FilterCollectionsEdit
                editCollections={this.state.editCollections}
                handleCollectionChange={this.handleCollectionChange}
                handleCollectionDelete={this.handleCollectionDelete}
              />
            ) : (
              collections.map(c => (
                <div className="form-check" key={c._id}>
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="collection-choices"
                      value={c.name}
                      checked={collectionFilter === c.name}
                      onChange={e => handleRadioSelect(e)}
                    />
                    {c.name}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
        <div id="tags-filter" style={this.collectionTagStyle}>
          <div className="list-group">
            <div
              style={this.dropdownTitle}
              onClick={e => handleDropdownClick(e)}
              data-toggle="collapse"
              data-target="#tags"
              aria-expanded="false"
              aria-controls="tags"
            >
              <FontAwesomeIcon
                icon={tagsOpen ? faCaretDown : faCaretRight}
                className="faCaretDropdown"
              />
              <div>
                <span>Tags </span>
                <span style={{ paddingLeft: "10px" }}>
                  {" "}
                  <FontAwesomeIcon icon={faTags} style={{ fontSize: "12px" }} />
                </span>
              </div>
            </div>
          </div>
          <div
            className="collapse multi-collapse show"
            id="tags"
            style={{
              marginLeft: "10px",
              fontSize: "14px",
              height: "90%",
              overflow: "auto"
            }}
          >
            {tags.map(tag => (
              <div className="form-check" key={tag}>
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="tag-choices"
                    id={tag}
                    value={tag}
                    checked={tagsFilter !== [] && tagsFilter.includes(tag)}
                    onChange={e => handleCheckboxSelect(e)}
                  />
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const ProfileWidget = () => {
  let profileDivStyle = {
    background: "black",
    height: "100%",
    width: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px"
  };

  let profileContentStyle = {
    display: "grid",
    gridTemplateColumns: "20% auto",
    width: "100%",
    cursor: "pointer"
  };

  return (
    <div id="profile-preview" style={profileDivStyle}>
      <div style={profileContentStyle}>
        <div style={{ display: "flex", margin: "auto" }}>
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
        <div style={{ fontSize: "11px" }}>lords.austin@gmail.com</div>
      </div>
    </div>
  );
};

const CollectionButtons = ({ updateCollections }) => {
  let [popoverOpen, togglePopover] = useState(false);
  let [editMode, toggleEditMode] = useState(false);
  let [newCollection, setNewCollection] = useState("");

  let pressEnter = event => {
    if (event.keyCode !== 13) return;

    if (newCollection === "") return;

    const collection = {
      _id: Date.now().toString(),
      name: newCollection,
      color: randomColor()
    };
    setNewCollection("");
    updateCollections(collection, "add");
  };

  let style = {
    height: "100%",
    width: "100%",
    color: "white",
    display: "flex",
    alignItems: "flex-end",
    padding: "0 10px",
    justifyContent: "space-around"
  };

  let buttonStyle = {
    height: "25px",
    fontSize: "11px",
    padding: "2px 5px"
  };

  return (
    <div>
      <div style={style}>
        <button
          className="btn btn-secondary btn-sm"
          style={buttonStyle}
          id="add-collection"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span> Collection</span>
        </button>
        {editMode ? (
          <button
            className="btn btn-primary btn-sm"
            style={buttonStyle}
            onClick={() => toggleEditMode(!editMode)}
          >
            <FontAwesomeIcon icon={faCheckCircle} />
            <span> Done</span>
          </button>
        ) : (
          <button
            className="btn btn-danger btn-sm"
            style={buttonStyle}
            onClick={() => toggleEditMode(!editMode)}
          >
            <FontAwesomeIcon icon={faEdit} />
            <span> Edit</span>
          </button>
        )}
      </div>
      <UncontrolledPopover
        placement="bottom"
        isOpen={popoverOpen}
        target="add-collection"
        trigger="legacy"
        toggle={() => togglePopover(!popoverOpen)}
      >
        <PopoverBody>
          <input
            type="text"
            className="form-control"
            value={newCollection}
            onChange={e => setNewCollection(e.target.value)}
            placeholder="new collection..."
            style={{
              fontSize: ".9rem",
              marginTop: "10px",
              lineHeight: "1",
              padding: "0px .75rem",
              width: "150px",
              height: "calc(2rem + 2px)"
            }}
            onKeyDown={pressEnter}
            autoFocus
          />
          <small>
            <em>press Enter to save</em>
          </small>{" "}
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
};

export default NotesFilter;
