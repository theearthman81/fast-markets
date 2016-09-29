import React, { PropTypes } from 'react';
import { conditionalRender, formatCurrency } from '../../utils';
import Expiry from '../expiry';

const TicketForm = (props) => {
  const inputChange = ({ target }) => {
    props.onSizeChange(target.value);
  };
  const createSubmitHandler = (direction) => (evt) => {
    evt.preventDefault();
    props.onSubmit(direction);
  };
  const {
    minDealSize,
    minExpiry,
    maxExpiry,
    payout,
    expiry,
    strike,
    size='',
  } = props;

  return (
    <section className="ticket">
      <form className="ticket-form">
        <section className="ticket-form__group">
          <div className="ticket-form__group__label">
            <label>Stake:</label>
          </div>
          <div className="ticket-form__group__field">
            <input
              placeholder={`Min: ${minDealSize}`}
              autoComplete="off"
              max="9999999"
              min={minDealSize}
              step="any"
              type="number"
              value={size}
              onChange={inputChange}
            />
          </div>
        </section>
        <section className="ticket-form__group">
          <div className="ticket-form__group__label">
            <label>Expiry:</label>
          </div>
          <div className="ticket-form__group__field">
            <Expiry
              expiry={expiry}
              min={minExpiry}
              maxn={maxExpiry}
              onChange={props.onExpiryChange} />
          </div>
        </section>
        <section className="ticket-form__group">
          <div className="ticket-form__group__label">
            <label>Direction:</label>
          </div>
          <div className="ticket-form__group__field">
            <div className="ticket-form__direction">
              <button
                className="btn btn--price btn--price--above"
                onClick={createSubmitHandler('BUY')}>
                above
              </button>
              <div className="ticket-form__direction__strike">
                {formatCurrency(strike)}
              </div>
              <button
                className="btn btn--price btn--price--below"
                onClick={createSubmitHandler('SELL')}>
                below
              </button>
            </div>
          </div>
        </section>
        <section className="ticket-form__group">
          <div className="ticket-form__group">
            <div className="ticket-form__group__label">
              <label>Payout (inc stake):</label>
            </div>
            <div className="ticket-form__group__field">
              <div className="ticket-form__direction__strike">
                {conditionalRender(payout, formatCurrency(payout), '-')}
              </div>
            </div>
          </div>
        </section>
      </form>
    </section>
  );
};

TicketForm.propTypes = {
  minDealSize: PropTypes.number.isRequired,
  minExpiry: PropTypes.number.isRequired,
  maxExpiry: PropTypes.number.isRequired,
  size: PropTypes.number,
  expiry: PropTypes.string,
  strike: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  payout: PropTypes.number,
  onSizeChange: PropTypes.func.isRequired,
  onExpiryChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TicketForm;
