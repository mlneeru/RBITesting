import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { getMenuList, getAllSections, getAllItems } from './api';
import { Tile } from './Components/Tile/tile';
import { Footer } from './Components/Footer/footer';

import { cloneDeep } from 'lodash';
import './app.css';
export class App extends React.Component {
  state = {
    mainList: [],
    sectionList: [],
    itemsList: [],
    showSections: true,
    selectedSectionID: '',
  };

  componentDidMount() {
    let responseMenuListRawData = [];
    let sectionList = [];
    let parsedData = [];
    let allItemsList = [];

    getMenuList().then((response) => {
      responseMenuListRawData = response.data.options;
      let allSectionsList = [];
      getAllSections().then((response) => {
        allSectionsList = response.data;
        responseMenuListRawData.forEach((item) => {
          const sectionData = allSectionsList.filter(
            (sectionItem) => sectionItem._id === item._key
          )[0];
          if (sectionData) {
            sectionList.push(sectionData);
            parsedData.push({
              name: sectionData.name.en,
              imageID: sectionData.image.asset._ref,
              id: sectionData._id,
            });
          }
          this.setState(() => {
            return {
              mainList: parsedData,
              sectionList,
              showSections: true,
            };
          });
        });
      });
    });
    getAllItems().then((response) => {
      allItemsList = response.data;
      this.setState((state) => {
        return { itemsList: allItemsList };
      });
    });
  }

  getSectionsList() {
    const parsedSectionData = [];
    this.state.sectionList.forEach((sectionData) => {
      parsedSectionData.push({
        name: sectionData.name.en,
        imageID: sectionData.image.asset._ref,
        id: sectionData._id,
      });
    });
    this.setState(() => {
      return {
        mainList: parsedSectionData,
        showSections: true,
        selectedSectionID: '',
      };
    });
  }

  getItemsListUnderASection(sectionID, showSections) {
    this.setState((state) => {
      const itemsListInderSection = [];
      const selectedSection = cloneDeep(
        state.sectionList.find((section) => section._id === sectionID)
      );
      if (selectedSection && selectedSection.options) {
        selectedSection.options.forEach((value) => {
          const itemData = cloneDeep(
            state.itemsList.filter(
              (itemRawData) => itemRawData._id === value._ref
            )[0]
          );
          if (itemData) {
            itemsListInderSection.push({
              name: itemData.name.en,
              imageID: itemData.image.asset._ref,
            });
          }
        });
      }

      return {
        mainList: itemsListInderSection,
        showSections,
        selectedSectionID: sectionID,
      };
    });
  }

  updateItemList = (id) => {
    this.getItemsListUnderASection(id, false);
  };
  getImagePath(imageID) {
    if (imageID) {
      return '../../images/'.concat(imageID);
    }
    return null;
  }
  handleClickLocale = () => {
    alert('you clicked EN ESPANOL');
  };
  handleClickCoupon = () => {
    alert('you clicked on Have a coupon');
  };
  render() {
    const burgerKing = './images/e1c01c470dbeb57a7d69a076f947b0d6d06753d8.png';

    return (
      <div className="app">
        <div classNam="container">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <ul className="nav navbar-nav">
                <li
                  className={`navbarItem ${
                    this.state.selectedSectionID === '' ? 'activeNavbar' : ''
                  }`}
                >
                  <a
                    className="sectionsList"
                    onClick={() => this.getSectionsList()}
                  >
                    <div className="imageContainer">
                      <img
                        src={burgerKing}
                        className="imageStyle"
                        alt="BurgerKing"
                      />
                    </div>
                    <div className="imageLabel">
                      <span
                        class={`titleLabel ${
                          this.state.selectedSectionID === ''
                            ? 'activeSection'
                            : ''
                        }`}
                      >
                        Menu
                      </span>
                    </div>
                  </a>
                </li>
                {this.state.sectionList.map((item) => {
                  return (
                    <li
                      key={item._id}
                      className={`navbarItem ${
                        this.state.selectedSectionID === item._id
                          ? 'activeNavbar'
                          : ''
                      }`}
                    >
                      <a
                        onClick={() =>
                          this.getItemsListUnderASection(item._id, true)
                        }
                        className="sectionsList"
                      >
                        <div className="imageContainer">
                          <img
                            src={this.getImagePath(item.image.asset._ref)}
                            className="imageStyle"
                            alt={item.image.asset._ref}
                          />
                        </div>
                        <div className="imageLabel">
                          <span
                            class={`titleLabel ${
                              this.state.selectedSectionID === item._id
                                ? 'activeSection'
                                : ''
                            }`}
                          >
                            {item.name.en}
                          </span>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>

        <div className="sections-data">
          <Tile
            list={cloneDeep(this.state.mainList)}
            updateItemsList={this.updateItemList}
            showSections={this.state.showSections}
          />
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;
