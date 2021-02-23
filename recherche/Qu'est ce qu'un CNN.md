# Réseaux de neurones convolutionnelle

## I. Les Réseaux de Neurones

### 1. Introduction

Le domaine des réseaux de neurones a été initialement inspiré par l’objectif de la modélisation des systèmes neuronaux biologiques, mais depuis lors, il a divergé et est devenu une question d’ingénierie et d’obtention de bons résultats dans les tâches d’apprentissage automatique.

En effet, dans un système neuronal biologique, chaque **neurone** reçoit des signaux d'entrée de ses **dendrites** et produit des signaux de sortie le long de son **axone**. L'axone finit par se ramifier et se connecter via les **synapses** aux dendrites d'autres neurones. Dans le modèle de calcul d’un neurone, les signaux qui voyagent le long des axones interagissent de manière multiplicative avec les dendrites de l’autre neurone en fonction de la force synaptique de cette synapse. L’idée est que les forces synaptiques sont apprenables et contrôlent la force de l’influence (et sa direction: excitrice (poids positif) ou inhibitrice (poids négatif)) d’un neurone sur un autre. Dans le modèle de base, les dendrites transmettent le signal au corps de la cellule où ils sont tous additionnés. Si la somme finale dépasse un certain seuil, le neurone peut déclencher , envoyant une pointe le long de son axone. Sur la base de cette interprétation, nous modélisons la cadence de déclenchement du neurone avec une **fonction d’activation**, qui représente la fréquence des pointes le long de l’axone.


![Neurone](./image/neuron.png)


### 2. Architectures de réseaux neuronaux

Les réseaux de neurones sont modélisés comme des ensembles de neurones connectés dans un graphe acyclique. En d'autres termes, les sorties de certains neurones peuvent devenir des entrées pour d'autres neurones. Pour les réseaux de neurones normaux, le type de couche le plus courant est la couche entièrement connectée comme ci-dessous.

![Modèle Réseaux de neurones](./image/neural_net.jpg)


Chaque neurone de la couche cachée va calculer la somme de ses entrées puis passer cette valeur à travers la fonction d'activation pour produire sa sortie, de la manière suivante.

![Modèle Réseaux de neurones](./image/hidden_neuron.png)


Il existe différentes **fonctions d'activation**. Voici les plus utilisées:

![Modèle Réseaux de neurones](./image/activation_function.png)


## II. Les CNNs

Les **réseaux de neurones convolutionnels** sont constitués de neurones dont les poids et les biais peuvent être appris. Chaque neurone reçoit des entrées, effectue un produit scalaire et le suit éventuellement avec une non-linéarité. L'ensemble du réseau exprime toujours une seule fonction de score différenciable: des pixels d'image brute d'un côté aux scores de classe de l'autre. Et ils ont toujours une fonction de perte sur la dernière couche.

Les architectures ConvNet supposent explicitement que les entrées sont des images, ce qui nous permet de coder certaines propriétés dans l’architecture. Celles-ci rendent alors la fonction de transfert plus efficace à mettre en œuvre et réduisent considérablement la quantité de paramètres dans le 
 
<img src="image/cnn.jpeg"
    alt="Modèle Réseaux de neurones"
    style="float: center;" />

Un ConvNet simple est une séquence de couches et chaque couche d'un ConvNet transforme un volume d'activations en un autre à l'aide d'une fonction différentiable. Nous utilisons trois types de couches pour construire des architectures ConvNet: **couche convolutif , couche Pooling et couche entièrement connecté**. Nous allons empiler ces couches pour former une architecture ConvNet complète .

En faisant glisser un filtre sur la largeur et la hauteur du volume d'entrée, nous produirons une **carte d'activation** qui donne les réponses de ce filtre à chaque position spatiale. Intuitivement, le réseau apprendra les filtres qui s'activent lorsqu'il détecte un type de caractéristique visuelle, tel qu'un bord d'une orientation ou une tache de couleur sur la première couche,ou éventuellement des motifs complets.

La **couche de convolution** est la composante clé des réseaux de neurones convolutifs, et constitue toujours au moins leur première couche.


![Modèle Réseaux de neurones](./image/giphy.gif)


On obtient pour chaque paire (image, filtre) une **carte d'activation**, ou feature map, qui nous indique où se situent les features dans l'image : plus la valeur est élevée, plus l'endroit correspondant dans l'image ressemble à la feature. Les noyaux des filtres désignent les poids de la couche de convolution. Ils sont initialisés puis mis à jour par **rétropropagation du gradient**. 

Une **couche Pooling** est souvent placé entre deux couches de convolution : elle reçoit en entrée plusieurs feature maps, et applique à chacune d'entre elles l'opération de pooling. Elle consiste à réduire la taille des images, tout en préservant leurs caractéristiques importantes. On améliore ainsi l'efficacité du réseau et on évite le sur-apprentissage.

![Modèle Réseaux de neurones](./image/convnet.jpeg)


Dans l'exemple ci-dessus on retrouve aussi des **couches de correction**, ReLU. 

![Modèle Réseaux de neurones](./image/RELU.png)


La couche de correction ReLU remplace donc toutes les valeurs négatives reçues en entrées par des zéros. Elle joue le rôle de **fonction d'activation**.

La **couche fully-connected** (FC) constitue toujours la dernière couche d'un réseau de neurones, convolutif ou non. 

Ce type de couche reçoit un vecteur en entrée et produit un nouveau vecteur en sortie. Pour cela, elle applique une combinaison linéaire puis éventuellement une fonction d'activation aux valeurs reçues en entrée.

La dernière couche fully-connected permet de classifier l'image en entrée du réseau : elle renvoie un vecteur de taille N, où N est le nombre de classes dans notre problème de classification d'images. Chaque élément du vecteur indique la probabilité pour l'image en entrée d'appartenir à une classe. 

La couche fully-connected détermine le lien entre la position des features dans l'image et une classe. En effet, le tableau en entrée étant le résultat de la couche précédente, il correspond à une carte d'activation pour une feature donnée : les valeurs élevées indiquent la localisation (plus ou moins précise selon le pooling) de cette feature dans l'image. Si la localisation d'une feature à un certain endroit de l'image est caractéristique d'une certaine classe, alors on accorde un poids important à la valeur correspondante dans le tableau.


## Bibliographie


- Convolutional Neural Networks for Visual Recognition (Stanford): http://cs231n.github.io/
- An Intuitive Explanation of Convolutional Neural Networks Comments Feed: https://ujjwalkarn.me/2016/08/11/intuitive-explanation-convnets/
- Classez et segmentez des données visuelles https://openclassrooms.com/fr/courses/4470531-classez-et-segmentez-des-donnees-visuelles