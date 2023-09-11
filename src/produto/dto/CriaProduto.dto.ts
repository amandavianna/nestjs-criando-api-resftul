import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CaracteristicaProdutoDTO {
  @IsString({ message: 'Nome da cadasterística deve ser uma string' })
  @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
  nome: string;

  @IsString({
    message: 'Descrição da cadasterística deve ser uma string',
  })
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  descricao: string;
}

export class ImagemProdutoDTO {
  @IsUrl(undefined, { message: 'URL para imagem inválida' })
  url: string;

  @IsString({ message: 'Descrição da imagem deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;
}

export class CriaProdutoDTO {
  @IsString({ message: 'Nome do produto deve ser uma string' })
  @IsNotEmpty({
    message: 'Nome do produto não pode ser vazio',
  })
  nome: string;

  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false },
    {
      message: 'Valor do produto precisa ter até duas casas decimais',
    },
  )
  @IsPositive({
    message:
      'Valor do produto precisa ser um número positivo (não pode ser zero)',
  })
  valor: number;

  @IsNumber()
  @Min(0, {
    message: 'Quantidade precisa ser um número igual ou maior que zero',
  })
  quantidadeDisponivel: number;

  @IsString({ message: 'Descrição deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição não pode ser vazia' })
  @MaxLength(1000, {
    message: 'Descrição não pode ser maior que 1000 caracteres',
  })
  descricao: string;

  @IsArray({ message: 'Lista de características deve ser um array' })
  @ValidateNested()
  @Type(() => CaracteristicaProdutoDTO)
  @ArrayMinSize(3, {
    message:
      'Lista de características do produto precisa ter pelo menos 3 itens',
  })
  caracteristicas: CaracteristicaProdutoDTO[];

  @IsArray({ message: 'Lista de imagens deve ser um array' })
  @ValidateNested()
  @Type(() => ImagemProdutoDTO)
  @ArrayMinSize(1, {
    message: 'Lista de imagens do produto precisa ter pelo menos 1 item',
  })
  imagens: ImagemProdutoDTO[];

  @IsString({ message: 'Categoria deve ser uma string' })
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  categoria: string;

  @IsDateString(undefined, {
    message: 'Data da criação deve ser uma string de data',
  })
  dataCriacao: Date;

  @IsDateString(undefined, {
    message: 'Data da atualização deve ser uma string de data',
  })
  dataAtualizacao: Date;
}
