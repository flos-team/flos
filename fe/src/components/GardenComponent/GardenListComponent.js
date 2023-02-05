import FlowerListItem from "./FlowerListItem";

const GardenListComponent = (props) => {
    const flowersubList = [...Array(10)].map((e, i) => <FlowerListItem></FlowerListItem>);
    return (
        <>
            {flowersubList}
        </>
    );
}

export default GardenListComponent;