//перевикористати в іншій задачі

//Скрипт 1. Зміна властивостей атрибутів полів карточки

function setPropertyRequired(attributeName, boolValue = true) {
  //обов"язкове
  var attributeProps = EdocsApi.getControlProperties(attributeName);
  attributeProps.required = boolValue;
  EdocsApi.setControlProperties(attributeProps);
}

function setPropertyHidden(attributeName, boolValue = true) {
  //приховане
  var attributeProps = EdocsApi.getControlProperties(attributeName);
  attributeProps.hidden = boolValue;
  EdocsApi.setControlProperties(attributeProps);
}

function setPropertyDisabled(attributeName, boolValue = true) {
  //недоступне
  var attributeProps = EdocsApi.getControlProperties(attributeName);
  attributeProps.disabled = boolValue;
  EdocsApi.setControlProperties(attributeProps);
}

function DetermineResponsibleTask() {
  debugger;
  var stateTask = EdocsApi.getCaseTaskDataByCode(
    "SignPapDetermineResponsible"
  ).state;
  if (
    stateTask == "assigned" ||
    stateTask == "inProgress" ||
    stateTask == "delegated"
  ) {
    setPropertyDisabled("ResponsibleEmployee", false);
    setPropertyRequired("ResponsibleEmployee");
    setPropertyHidden("ResponsibleEmployee", false);
  } else if (stateTask == "completed") {
    setPropertyDisabled("ResponsibleEmployee");
  } else {
    setPropertyRequired("ResponsibleEmployee", false);
    setPropertyHidden("ResponsibleEmployee");
    setPropertyDisabled("ResponsibleEmployee");
  }
}

function onTaskExecuteDetermineResponsible(routeStage) {
  if (
    routeStage.executionResult == "executed" &&
    !EdocsApi.getAttributeValue("ResponsibleEmployee").value
  ) {
    throw `Внесіть значення в поле "Відповідальний працівник"`;
  }
}

function onCardInitialize() {
  DetermineResponsibleTask();
}
