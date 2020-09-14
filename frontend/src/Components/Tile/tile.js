import React from 'react';
import './tile.css';

export class Tile extends React.Component {
  state = {
    menuList: [],
  };

  getImagePath(imageID) {
    if (imageID) {
      return '../../images/'.concat(imageID);
    }
    return null;
  }

  handleClickOnSection = (item) => {
    if (this.props.showSections) {
      this.props.updateItemsList(item.id);
    }
  };

  render() {
    return (
      <div className="sectionContainer">
        {(this.props.list ? this.props.list : []).map((item) => {
          return (
            <div
              onClick={() => this.handleClickOnSection(item)}
              className="section"
              key={item.imageID}
            >
              <div className="sectionImage">
                <img
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: '1.75rem',
                  }}
                  src={this.getImagePath(item.imageID)}
                  alt={item.imageID}
                />
              </div>

              <div className="sectionName">{item.name}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
