import '../styles/StatsTooltip.css'
import styled from 'styled-components';

function StatsTooltip({ payload, label, active }){

// numberOfD2s: 0, d2sBlocked: 0, avgReactionTimeD2: [0,0], 
// avgReactionMiss: [0,0], longestStreak: [0,0], wrongReactionNum: 0, 
// blockPercentage: 0
    if(active && payload && payload.length){
        return(
            <div className="custom-tooltip">
                <div className = 'header'><strong>Session {label} stats:</strong></div>
                <FlexRow>
                    <p className = 'label'>
                        {`d2 block %`}:
                    </p>
                    <p className='label'>{`${payload[0].value}`}%</p>
                </FlexRow>
                <FlexRow>
                    <p className = 'otherStats'>
                        Avg reaction time:
                    </p>
                    <p className = 'otherStats'>{payload[0].payload.avgReactionTimeD2[1] != 0 ? Math.ceil((payload[0].payload.avgReactionTimeD2[0] / payload[0].payload.avgReactionTimeD2[1])) : '0 '} ms</p>
                </FlexRow>
                <FlexRow>
                    <p className = 'otherStats'>Best streak:</p>
                    <p className = 'otherStats'>{payload[0].payload.longestStreak[1]}</p>
                </FlexRow>
                <FlexRow>
                    <p className="otherStats">Avg missed reaction to d2:</p>
                    <p className="otherStats">{payload[0].payload.avgReactionMiss[1] != 0 ? Math.ceil((payload[0].payload.avgReactionMiss[0] / payload[0].payload.avgReactionMiss[1])) : '0 '} ms</p>
                </FlexRow>
                <FlexRow>
                    <p className="otherStats">False reaction #:</p>
                    <p className="otherStats">{payload[0].payload.wrongReactionNum}</p>
                </FlexRow>
            </div>
        )   
    }
    return null;
}

const FlexRow = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    gap: 18px;
`; 

export default StatsTooltip;