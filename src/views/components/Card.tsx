import { ImageSourcePropType } from "react-native";
import { Card as RNPCard } from "react-native-paper";
import ContainedCardProps from 'react-native-paper'


interface CardProps extends ContainedCardProps.CardProps {
    title: string;
    key?: any;
    actions?: React.JSX.Element[]
    cover?: ImageSourcePropType;
}

export const Card = (props: CardProps) => {
    return (
        <RNPCard {...props}>
            <RNPCard.Title title={props?.title}></RNPCard.Title>
            {props?.cover ? <RNPCard.Cover source={props?.cover}></RNPCard.Cover> : <></> }
            <RNPCard.Content>
                {props.children}
            </RNPCard.Content>
            {props?.actions?.length ? <RNPCard.Actions>{props.actions}</RNPCard.Actions> : <></>}
        </RNPCard>
    );
}

export default Card;