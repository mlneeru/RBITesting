import React from 'react';
import '../Test/test.css';

export class Test extends React.Component {
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
      <div className="section-container">
        {(this.props.list ? this.props.list : []).map((item) => {
          return (
            <div
              onClick={() => this.handleClickOnSection(item)}
              className="section"
              key={item.imageID}
            >
              <div className="section-image">
                <img
                  style={{ height: '100%' }}
                  src={this.getImagePath(item.imageID)}
                  alt={item.imageID}
                />
              </div>

              <div className="section-name">{item.name}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
