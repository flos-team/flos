import styled from "@emotion/styled";


// 전체를 감싸는 Detail Tag
const Detail = styled.div`
    box-sizing: border-box;

    background: linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0.0572917) 99.99%, rgba(255, 255, 255, 0) 100%);
    border: 1px solid #FBFBFB;

    width: 270px;
    margin: 20px;
    padding: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SubDetailBox = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// 꽃 이름 속성 Tag
const FlowerName = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #000000;
`;

// 설명 속성 Tag
const DescriptionText = styled.div`
    color: gray;
`;

// 상태 속성 Tag
const StateText = styled.div`
    color: gray;
    font-size: 16px;
`;

// 날짜 속성 Tag
const DateCountText = styled.div`
    font-size: 20px;
    margin-bottom: 5px;
`;

// 날짜 세부 속성 Tag
const DateDetailText = styled.div`
    color: gray;
`;


const DetailData = (props) => {
    return (
        <Detail>
            <SubDetailBox>
                <StateText>{props.flowerData.state}</StateText>
                <FlowerName>{props.flowerData.name}</FlowerName>
            </SubDetailBox>
            <SubDetailBox>
                <DescriptionText> 길이 </DescriptionText>
                <div>{props.flowerData.length}cm</div>
            </SubDetailBox>
            <SubDetailBox>
                <DescriptionText> 성장 기간 </DescriptionText>
                <DateCountText> {props.flowerData.duration}일 </DateCountText>
                <DateDetailText>( {props.flowerData.createdAt.split("T")[0]} ~ {props.flowerData.blossomAt.split("T")[0]})</DateDetailText>
            </SubDetailBox>
        </Detail>
    );
};

export default DetailData;