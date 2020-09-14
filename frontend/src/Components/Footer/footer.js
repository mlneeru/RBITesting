import React from 'react';
import './footer.css';

export class Footer extends React.Component {
  handleClickOnSection = () => {
    alert('you clicked checkout');
  };

  render() {
    return (
      <div className="footer">
        <div className="row">
          <div className="column">
            <div className="leftColumn">
              <p>SEE TIPS & TRICKS</p>
              <p className="leftColumnLabel">NEED HELP?</p>
            </div>
          </div>
          <div className="column">
            <div className="rightColumn">
              <p>
                TOTAL (0 ITEM) :<span className="rightColumnLabel">$0.00</span>
              </p>
              <button
                type="button"
                className="rightColumnButton"
                onClick={() => this.handleClickOnSection()}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
