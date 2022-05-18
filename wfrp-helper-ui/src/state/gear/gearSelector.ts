import {AppDispatch, RootState} from "state/Store";
import {getArmorStats} from "./gearSlice";
import {connect} from "react-redux";

const mapStateToProps = (state: RootState) => {
    return {
        armorStats: state.gear.armorStats,
    }
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getArmorStats: (ids: number[]) => dispatch(getArmorStats(ids)),
});

const withGear = connect(mapStateToProps, mapDispatchToProps);
export default withGear;

export const armorStatsSelector = (state: RootState) => state.gear.armorStats;
export const currentArmorIds: (state: RootState) => number[] = (state: RootState) => state.gear.ids;