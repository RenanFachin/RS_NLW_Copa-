// Será necessário renomear a importação do button do native-base pq gera um conflito com o nome do componente
import { Button as ButtonNativeBase, Text, IButtonProps} from 'native-base'

// type?: quer dizer que é uma propriedade opcional
interface Props extends IButtonProps{
    title: string;
    type?: 'PRIMARY' | 'SECONDARY'
}

export function Button({title, type = 'PRIMARY', ...rest}: Props) {
    return(
        <ButtonNativeBase 
            w="full"
            h={14}
            rounded="sm"
            fontSize="md"
            textTransform="uppercase"
            bg={type === 'SECONDARY' ? 'blue.500' : 'yellow.500'}
            _pressed={{
                bg: type === 'SECONDARY' ? 'blue.600' : 'yellow.600'
            }}
            {...rest}
        >
            <Text
                fontSize="sm"
                fontFamily="heading"
                color={type === 'SECONDARY' ? 'white' : 'black'}
            >
                {title}
            </Text>
        </ButtonNativeBase>
    )
}