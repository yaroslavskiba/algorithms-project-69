### Hexlet tests and linter status:
[![Actions Status](https://github.com/yaroslavskiba/algorithms-project-69/workflows/hexlet-check/badge.svg)](https://github.com/yaroslavskiba/algorithms-project-69/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/6c90ab68f84ff46b1ab0/maintainability)](https://codeclimate.com/github/yaroslavskiba/algorithms-project-69/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6c90ab68f84ff46b1ab0/test_coverage)](https://codeclimate.com/github/yaroslavskiba/algorithms-project-69/test_coverage)

<h1>Поисковый движок</h1>

<i>Поисковый движок</i> — проект, в котором изучаются основные алгоритмы и структуры данных в поисковых системах. На практике применяются различные методы поиска, индексирование, ранжирование, метрики релевантности<b>(<i>tf-idf</i>)</b> и построим обратный индекс.

<h2>Установка</h2>

        git clone https://github.com/yaroslavskiba/algorithms-project-69.git

        sudo make install


<h3>Пример выполнения:</h3>

        const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
        const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
        const doc3 = { id: 'doc3', text: "I'm your shooter." };
        const docs = [doc1, doc2, doc3];

        const searchEngine = buildSearchEngine(docs); // поисковый движок запомнил документы

        // поиск по документам
        searchEngine.search('shoot'); // ['doc1', 'doc2']

        const searchEngine2 = buildSearchEngine([]); // Документы пусты
        searchEngine2.search(''); // []