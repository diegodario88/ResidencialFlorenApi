const oncallRepository = require('../repositories/oncall.repo');
const { updateCounter } = require('./counter');
const { checkScaleType } = require('../utils/scale.utils');
const { currentDateFormated, currentDate, currentDayOfWeek } = require('../utils/date.utils');

const reportUpdate = (prev, next) => console.log(`
🤖 Updating data
Date: ${currentDateFormated()} 
Scale: ${checkScaleType(currentDayOfWeek())}
_____________
⏮ Previous: ${prev.name}
⏭ Next: ${next.name}
`);

const onCallUpdater = async (prev, next) => {
  reportUpdate(prev, next);

  try {
    const resPrev = await oncallRepository.update(
      { _id: prev._id }, { [`${checkScaleType(currentDayOfWeek())}.status`]: false },
    );

    const resNext = await oncallRepository.update({ _id: next._id }, {
      [`${checkScaleType(currentDayOfWeek())}.date`]: currentDate(),
      [`${checkScaleType(currentDayOfWeek())}.status`]: true,
    });

    const isUpdated = !!(resPrev.ok && resNext.ok);

    if (isUpdated) {
      return console
        .log(`Updated Groups: ${prev.name} ↔️  ${next.name} successfully  ✅`);
    }

    throw new Error('⛔️ Updating groups did not return 🆗');
  } catch (error) {
    return console.error(error);
  }
};

const getNextGroup = async (currentOnCall) => {
  try {
    const nextGroup = await oncallRepository
      .getByNumber(await updateCounter(checkScaleType(currentDayOfWeek())));

    // eslint-disable-next-line no-unused-expressions
    nextGroup !== undefined
      ? onCallUpdater(currentOnCall, nextGroup)
      : console.error('Next Group is undefined');
  } catch (err) {
    console.error('Ups! Something went wrong in nextGroup service', err);
  }
};

const getCurrentGroup = () => oncallRepository.getByStatus(checkScaleType(currentDayOfWeek()));

module.exports = { getNextGroup, getCurrentGroup };
