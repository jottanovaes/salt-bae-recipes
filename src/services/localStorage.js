// localStorage
// O uso de localStorage é necessário para que as informações não se percam caso a pessoa atualize a página. O correto é usar os valores para iniciar sua store ou seu context.

// No localStorage do navegador:

// a chave mealsToken deve conter a seguinte estrutura:
// 1
// a chave cocktailsToken deve conter a seguinte estrutura:
// 1
// a chave user deve conter a seguinte estrutura:
// {
//     email: email-da-pessoa
// }
// a chave doneRecipes deve conter a seguinte estrutura:
// [{
//     id: id-da-receita,
//     type: comida-ou-bebida,
//     nationality: nacionalidade-da-receita-ou-texto-vazio,
//     category: categoria-da-receita-ou-texto-vazio,
//     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//     name: nome-da-receita,
//     image: imagem-da-receita,
//     doneDate: quando-a-receita-foi-concluida,
//     tags: array-de-tags-da-receita-ou-array-vazio
// }]
// a chave favoriteRecipes deve conter a seguinte estrutura:
// [{
//     id: id-da-receita,
//     type: food-ou-drink,
//     nationality: nacionalidade-da-receita-ou-texto-vazio,
//     category: categoria-da-receita-ou-texto-vazio,
//     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//     name: nome-da-receita,
//     image: imagem-da-receita
// }]
// a chave inProgressRecipes deve conter a seguinte estrutura:
// {
//     cocktails: {
//         id-da-bebida: [lista-de-ingredientes-utilizados],
//         ...
//     },
//     meals: {
//         id-da-comida: [lista-de-ingredientes-utilizados],
//         ...
//     }
// }
// Observações técnicas

// id-da-bebida e id-da-comida representam o ID de uma bebida e comida, respectivamente, e cada item da lista de ingredientes da respectiva receita deve ser representado apenas pelo número do ingrediente no formato numérico.
