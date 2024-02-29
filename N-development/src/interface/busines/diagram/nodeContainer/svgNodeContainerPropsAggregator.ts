export enum SvgNodeContainerSize {
    Common = 'common',
    Tall = 'tall'

}

export type SvgNodeContainerProps = {
    borderColor?: string
    isPlayAnimation?: boolean
}

export type SvgNodeContainerPropsAggregator = SvgNodeContainerProps & {
    size?: SvgNodeContainerSize
}