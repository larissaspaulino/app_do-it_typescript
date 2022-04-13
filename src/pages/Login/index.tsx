import { useState } from 'react'
import {
  Flex,
  Text,
  Grid,
  Image,
  Heading,
  VStack,
  Button,
  Box,
} from '@chakra-ui/react'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import LogoSecondary from '../../assets/logo-secondary.svg'
import { Input } from '../../components/Form/input'
import { useAuth } from '../../contexts/AuthContext'

interface SignInData {
  email: string
  password: string
}

export const Login = () => {
  const [loading, setLoading] = useState(false)

  const { signIn, user, accessToken } = useAuth()
  

  const signInSchema = yup.object().shape({
    email: yup.string().required('Email obrigatório').email('Email inválido'),
    password: yup.string().required('Senha obrigatória'),
  })

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInData>({ resolver: yupResolver(signInSchema) })

  const handleSignIn: SubmitHandler<SignInData> = (data: SignInData) => {
    setLoading(true)
    signIn(data)
      .then(() => {
        setLoading(false)
      })
      .catch((err) => setLoading(false))
  }

  return (
    <Flex
      padding={['10px 15px', '10px 15px', '0px', '0px']}
      alignItems='center'
      justifyContent='center'
      height={['auto', 'auto', '100vh', '100vh']}
      bgGradient={[
        'linear(to-b, purple.800 65%, white 35%)',
        'linear(to-b, purple.800 65%, white 35%)',
        'linear(to-r, purple.800 65%, white 35%)',
        'linear(to-r, purple.800 65%, white 35%)',
      ]}
      color='white'
    >
      <Flex
        w={['100%', '100%', '90%', '65%']}
        justifyContent='center'
        flexDirection={['column', 'column', 'row', 'row']}
        alignItems='center'
      >
        {/* coluna esquerda */}
        <Grid w={['100%', '100%', '50%', '50%']} paddingRight='100px'>
          <Image
            src={LogoSecondary}
            alt='doitLogo'
            boxSize={['120px', '120px', '150px', '150px']}
          />
          <Heading mt='4' as='h1'>
            O jeito fácil, grátis
          </Heading>
          <Text maxWidth='350px'>
            Flexível e atrativo de gerenciar
            <b> seus projetos em uma única plataforma</b>
          </Text>
        </Grid>
        {/* coluna direita - formulário */}
        <Grid
          as='form'
          mt={['4', '4', '0']}
          padding='30px 15px'
          border='3px solid'
          borderColor='gray.100'
          bg='white'
          color='gray.900'
          onSubmit={handleSubmit(handleSignIn)}
          w={['100%', '100%', '40%', '40%']}
        >
          <Heading size='lg'>Bem-vindo de volta</Heading>
          <VStack spacing='5' mt='6'>
            <Box w='100%'>
              <Input
                label='Login'
                type='email'
                error={errors.email}
                placeholder='Digite seu email'
                icon={FaEnvelope}
                {...register('email')}
              />
              {!errors.email && (
                <Text ml='1' mt='' color='gray.300'>
                  Exemplo: nome@email.com
                </Text>
              )}
            </Box>

            <Input
              label='Senha'
              placeholder='Digite sua senha'
              error={errors.password}
              icon={FaLock}
              {...register('password')}
            />
          </VStack>
          <VStack mt='4' spacing='5'>
            <Button
              isLoading={loading}
              bg='purple.800'
              width='100%'
              color='white'
              h='60px'
              borderRadius='8px'
              _hover={{ background: 'purple.900' }}
              type='submit'
            >
              Entrar
            </Button>
            <Text color='gray.400'>Ainda não possui uma conta?</Text>
            <Button
              bg='gray.100'
              width='100%'
              color='gray.300'
              h='60px'
              borderRadius='8px'
              _hover={{ background: 'gray.200' }}
              type='submit'
            >
              Cadastrar
            </Button>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  )
}
