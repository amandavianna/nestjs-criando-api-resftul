import { Body, Controller, Post } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  @Post()
  async criaProduto(@Body() dadosDoProduto) {
    this.produtoRepository.salvar(dadosDoProduto);
    return dadosDoProduto;
  }
}
