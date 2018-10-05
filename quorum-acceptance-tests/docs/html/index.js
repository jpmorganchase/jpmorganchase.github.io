
const statsTemplate = '<p class="stats">\
<span>\
	<span class="entity">Specifications: </span>\
	<span class="stat">SPEC_NUMBER</span>\
</span>\
<span class="separator">|</span>\
<span>\
	<span class="entity">Scenarios: </span>\
	<span class="stat">SCENARIO_NUMBER</span>\
</span>\
</p>\
';
const populateIndex = (specs) => {
    if (Object.keys(specs).length == 0) {
		document.getElementsByClassName("specs")[0].innerHTML = statsTemplate.replace("SPEC_NUMBER", 0).replace("SCENARIO_NUMBER", 0);
        return;
    }
    let text = "<ul>";
    let scenarioNumber = 0;
    specs.forEach((spec) => {
        text += "<li><p><b><a href=\"" + spec["path"] + "\">" + spec["name"] + "</a></b><ol>";
        spec.scenarios.forEach((scn) => {
            text += "<li>" + scn["name"] + "</li>";
            scenarioNumber++;
        });
        text += "</ol></p></li>";
    });
    text += "</ul></div>";
    const stats = statsTemplate.replace("SPEC_NUMBER", specs.length).replace("SCENARIO_NUMBER", scenarioNumber);
    document.getElementsByClassName("specs")[0].innerHTML = stats + text;
}

function handle(e) {
    if (e.keyCode === 13) {
        if (document.getElementsByClassName("tags")[0].value.trim() === "") {
            populateIndex(specs);
            return false;
        }
        populateIndex(filterSpecs(document.getElementsByClassName("tags")[0].value));
    }
    return false;
}
const filterSpecs = (tagExp) => {
    tags = getTagsWithoutOperators(tagExp).map((e) => e.replace("!", ""));
    const newSpecs = [];
    specs.forEach((spec) => {
        const scenarios = [];
        spec.scenarios.forEach(function(scn) {
            let newTagExp = replace(tagExp, scn.tags.filter(function(t) {
                return t !== "";
            }), "true");
            newTagExp = replace(newTagExp, tags, "false");
            if (eval(newTagExp)) scenarios.push(scn);
        });
        if (scenarios.length > 0)
            newSpecs.push({ "name": spec.name, "path": spec.path, "scenarios": scenarios });
    });
    return newSpecs;
}
const replace = (tagExp, tags, replaceString) => {
    let tagsWithOperators = getTagsWithOperators(tagExp);
    tags.forEach(function(t) {
        tagsWithOperators = replaceAll(tagsWithOperators, t, replaceString)
        tagsWithOperators = replaceAll(tagsWithOperators, "!" + t, "!" + replaceString)
    });
    return tagsWithOperators.join("");
}
const replaceAll = (elements, element, replacement) => elements.map((e) => element == e ? replacement : e);
const getTags = (tagExp, regex) => tagExp.split(regex).map((e) => e.trim()).filter((t) => t !== "");
const getTagsWithOperators = (tagExp) => getTags(tagExp, /(\)|\(|&|\|)/);
const getTagsWithoutOperators = (tagExp) => getTags(tagExp.replace(/\(/g, "").replace(/\)/g, ""), /(?:&|\|)/);
populateIndex(specs);
