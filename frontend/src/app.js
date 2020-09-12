/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { getMenuList, getAllSections, getAllItems } from './api';
import { Test } from './Components/Test/Test';
import { cloneDeep } from 'lodash';
// import { Menu } from './Components/Menu/Menu';
// import { Sections } from './Components/Sections/Sections';
import './app.css';
export class App extends React.Component {
  state = {
    mainList: [],
    sectionList: [],
    itemsList: [],
    showSections: true,
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
    debugger;
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
      return { mainList: parsedSectionData, showSections: true };
    });
  }

  getItemsListUnderASection(sectionID, showSections) {
    debugger;
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
      return { mainList: itemsListInderSection, showSections };
    });
  }

  updateItemList = (id) => {
    this.getItemsListUnderASection(id, false);
  };
  render() {
    // const burgerKing = './images/bcbb978bdb882ce6ef2304747f3111a6a76c8a49.png';

    const burgerKing = './images/burgerkinglogo.png';

    return (
      <>
        {/* <div className="sections-data">
          <Menu sectionList={this.state.sectionList} itemsList={this.state.itemsList} />
        </div> */}
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li className="active navbar-item">
                <a
                  className="testing"
                  //   href="#"
                  onClick={() => this.getSectionsList()}
                >
                  <div>
                    <img
                      src={burgerKing}
                      style={{ height: '100%' }}
                      alt="BurgerKing"
                    />
                  </div>
                  <span class="TitleLabel">Home</span>
                </a>
              </li>
              {this.state.sectionList.map((item) => {
                return (
                  <li key={item._id} className="navbar-item">
                    <a
                      onClick={() =>
                        this.getItemsListUnderASection(item._id, true)
                      }
                    >
                      {item.name.en}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <div className="sections-data">
          <Test
            list={cloneDeep(this.state.mainList)}
            updateItemsList={this.updateItemList}
            showSections={this.state.showSections}
          />
        </div>
      </>
    );
  }
}
export default App;
