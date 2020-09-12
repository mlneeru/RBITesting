// import React from 'react';
// import '../Sections/sections.css';
// export class Menu extends React.Component {
//   state = {
//     sectionList: [],
//     itemsList: [],
//   };

//   getImagePath(imageID) {
//     if (imageID) {
//       return '../../images/'.concat(imageID);
//     }
//     return null;
//   }
//   getItemsListUnderASection(item) {
//     const itemsListInderSection = [];
//     if (item.options) {
//       item.options.forEach((value) => {
//         const itemData = this.props.itemsList.filter(
//           (itemRawData) => itemRawData._id === value._ref
//         )[0];
//         if (itemData) {
//           itemsListInderSection.push({
//             name: itemData.name.en,
//             imageID: itemData.image.asset._ref,
//           });
//         }
//       });
//     }
//     debugger;
//     this.setState({ mainList: itemsListInderSection });
//   }

//   render() {
//     return (
//       <div className="section-container">
//         <nav className="navbar navbar-default">
//           <div className="container-fluid">
//             <ul className="nav navbar-nav">
//               <li className="active">
//                 <a href="#">Home</a>
//               </li>
//               {this.props.sectionList.map((item) => {
//                 return (
//                   <li key={item._id}>
//                     <a onClick={() => this.getItemsListUnderASection(item)}>
//                       {item.name.en}
//                     </a>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </nav>
//       </div>
//     );
//   }
// }
