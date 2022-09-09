import React = require("react");
import { isNumber, round } from "lodash";
import styled from "styled-components";

export interface IScopeIndicator {
    /**
     * Indicator label ex.CA TTC
     */
    label: string;

    /**
     * Value of the circle
     */
    value: number;
    /**
     * Value of progression
     */
    progression: number;
    /**
     * Is rate value
     */
    isRateValue?: boolean;
    /**
     * Is currency value
     */
    isCurrencyValue?: boolean;
    /**
     * If current scope indicator progression value is profit rate contribution display "pts" at the tail of the value
     */
    isProgressionProfitContributionValue?: boolean;
    /**
     * The CSS shorthand property flex of the component inner
     */
    flex?: number;
}

/**
 * Indicator circle component
 * @param props
 * @param props.indicator
 * @returns
 */
export const CircleWithValue = ({
    valueToDisplay,
    valueUnit,
    valueExplenation,
}: // indicator,
{
    valueToDisplay: string | number; // indicator: IScopeIndicator;
    valueUnit: string;
    valueExplenation: string;
}) => {
    // const flexValue = indicator.flex || 1;

    //   const { trendSign, circleBorderColor, valueFormatted, valueTypeFormatted } =
    //     _formatIndicatorCircleData(indicator);

    //   const indicatorProgression = _formatProgressionValue(indicator);

    //   const progressionTrendSign = indicator.progression ? trendSign : "";

    //   const valueLength =
    //     typeof valueFormatted === "string" ? valueFormatted.length : 1;

    return (
        <StyledDivIndicatorSquareInner flex={1}>
            <StyledCircle>
                <StyledCircleInner {...{ circleBorderColor: "#F2A116" }}>
                    <StyledValueDiv>
                        <StyledCircleValue $valueLength={1}>
                            {valueToDisplay}
                        </StyledCircleValue>
                        <StyledCircleNumberType>
                            {valueUnit}
                        </StyledCircleNumberType>
                    </StyledValueDiv>
                    <StyledProgressionDiv txtColor={"#c1f9fc"}>
                        <StyledProgressionTrendDiv>
                            {valueExplenation}
                        </StyledProgressionTrendDiv>
                        <StyledProgressionTrendDiv>
                            {/* {"jhjk"} */}
                        </StyledProgressionTrendDiv>
                    </StyledProgressionDiv>
                </StyledCircleInner>
            </StyledCircle>
        </StyledDivIndicatorSquareInner>
    );
};

// ---------------------------------------------------------------------------------- //
// ------------------------------------- Methods ------------------------------------ //
// ---------------------------------------------------------------------------------- //

// /**
//  * Format indicator circle data
//  * @param indicator
//  * @returns
//  */
// function _formatIndicatorCircleData(indicator: IScopeIndicator) {
//   const { value, type } = _formatValue(indicator);

//   let trendSign = "";
//   let circleBorderColor = mainMuiTheme.palette.background.default;

//   if (indicator.progression) {
//     if (_isValuePositive(indicator.progression)) {
//       trendSign = "+";
//       circleBorderColor = ROSS_THEME_VARIABLES.colors.iguanaGreen;
//     } else {
//       trendSign = "-";
//       circleBorderColor = ROSS_THEME_VARIABLES.colors.fuzzyWuzzy;
//     }
//   }

//   return {
//     trendSign,
//     circleBorderColor,
//     valueFormatted: value,
//     valueTypeFormatted: type,
//   };
// }

// ------------------------------------------------------------------------------- //
// --------------------------------- Style --------------------------------------- //
// ------------------------------------------------------------------------------- //

const StyledDivIndicatorSquareInner = styled.div<{ flex: number }>`
    display: flex;
    flex: ${(props) => props.flex || 1};
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-transform: uppercase;
`;

const StyledCircle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
`;

const StyledCircleInner = styled.div<{
    circleBorderColor: string;
}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 6.5rem;
    height: 6.5rem;
    /* margin-top: 10px; */
    border-radius: 50%;
    border: ${(props) => `0.8rem solid ${props.circleBorderColor}`};
`;

const StyledValueDiv = styled.div`
    display: flex;
    color: ${(props) => props.theme.colors.lightGrey};
    flex-direction: row;
    font-size: 1rem;
`;

const StyledProgressionDiv = styled.div<{
    txtColor: string;
}>`
    display: flex;
    padding-top: 4px;
    flex-direction: row;
    font-size: 0.7rem;
    color: ${(props) => `${props.txtColor}`};
`;

const StyledProgressionTrendDiv = styled.div`
    display: flex;
    text-transform: none;
`;

const StyledCircleValue = styled.div<{ $valueLength: number }>`
    font-size: ${(props) => `${props.$valueLength > 5 ? "20" : "24"}px`};
    line-height: 1;
    padding: 0 2px 0 0;
`;

const StyledCircleNumberType = styled.div`
    display: flex;
    font-weight: 600;
    align-items: flex-end;
    font-size: 16px;
`;

const StyledCircleSmallNumberType = styled.span`
    font-size: smaller;
`;
