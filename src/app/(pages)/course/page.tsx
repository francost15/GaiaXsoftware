"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaCheckCircle, FaTimesCircle, FaMedal } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NavBar } from "@/components";
import Link from "next/link";

// Ejemplo de actividades para el módulo de microaprendizaje
const activities = [
  {
    id: 1,
    question: "¿Cuál es la definición de liderazgo?",
    type: "multiple-choice",
    options: [
      "La capacidad de imponer órdenes a un grupo",
      "La capacidad de guiar y motivar a un equipo",
      "El acto de controlar todas las decisiones de un grupo",
      "Un estilo de comunicación pasivo",
    ],
    correctAnswer: "La capacidad de guiar y motivar a un equipo",
  },
  {
    id: 2,
    question: "Completa la oración: El liderazgo es más efectivo cuando...",
    type: "fill-in-the-blank",
    correctAnswer: "se inspira a los demás",
  },
  {
    id: 3,
    question: "Mira el siguiente video sobre liderazgo y responde la pregunta.",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/XLJ0Fj-CkZk",
    correctAnswer: "Inspirar a los demás",
  },
  {
    id: 4,
    question: "Escenario: Eres el líder de un equipo que enfrenta un desafío importante. ¿Qué harías?",
    type: "scenario",
    options: [
      "Tomar todas las decisiones por ti mismo",
      "Delegar responsabilidades y apoyar a tu equipo",
      "Ignorar el problema y esperar que se resuelva solo",
      "Culpar a tu equipo por el problema",
    ],
    correctAnswer: "Delegar responsabilidades y apoyar a tu equipo",
  },
];

const AchievementScreen = ({ timeElapsed }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 text-gray-800">
    <FaMedal className="text-yellow-500 text-6xl mb-4 animate-bounce" />
    <h1 className="text-5xl font-extrabold mb-2 text-purple-600 animate-pulse">
      ¡Lo has logrado!
    </h1>
    <p className="text-2xl mb-4">Tiempo total: {timeElapsed}s</p>
    <Link href="/">
      <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-transform transform hover:scale-105">
        Volver al inicio
      </Button>
    </Link>
  </div>
);

const VideoActivity = ({ videoUrl, question, handleAnswer }) => (
  <div>
    <iframe
      width="100%"
      height="315"
      src={videoUrl}
      title="Video de Liderazgo"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
    <p className="text-lg mt-4">{question}</p>
    <Textarea
      placeholder="Escribe tu respuesta aquí..."
      className="w-full rounded-lg border border-gray-300 focus:border-blue-400"
      onChange={(e) => handleAnswer(e.target.value)}
    />
  </div>
);

const ScenarioActivity = ({ options, handleOptionClick }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {options.map((option) => (
      <Button
        key={option}
        onClick={() => handleOptionClick(option)}
        className="p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all"
      >
        {option}
      </Button>
    ))}
  </div>
);

export default function MicroLearningModule() {
  const [currentStep, setCurrentStep] = useState(0); // 0 para microaprendizaje, 1 en adelante para actividades
  const [currentActivity, setCurrentActivity] = useState(activities[0]);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [progress, setProgress] = useState(0); // Progreso de la actividad
  const [timeLeft, setTimeLeft] = useState(60); // Tiempo en segundos
  const [timeElapsed, setTimeElapsed] = useState(0); // Tiempo transcurrido
  const [showAchievement, setShowAchievement] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // Estado para verificar si la actividad ha sido verificada

  useEffect(() => {
    if (timeLeft > 0 && !showAchievement) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        setTimeElapsed(timeElapsed + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showAchievement]);

  const handleMultipleChoice = (option: string) => {
    if (option === currentActivity.correctAnswer) {
      setFeedback("¡Correcto! 😊");
      setProgress(progress + 1);
      setIsVerified(true);
    } else {
      setFeedback("Incorrecto. 😢 Inténtalo de nuevo.");
    }
  };

  const handleFillInTheBlank = () => {
    if (
      userAnswer.toLowerCase().trim() ===
      currentActivity.correctAnswer.toLowerCase().trim()
    ) {
      setFeedback("¡Correcto! 😊");
      setProgress(progress + 1);
      setIsVerified(true);
    } else {
      setFeedback("Incorrecto. 😢 Inténtalo de nuevo.");
    }
  };

  const handleVideoAnswer = (answer: string) => {
    if (answer.toLowerCase().trim() === currentActivity.correctAnswer.toLowerCase().trim()) {
      setFeedback("¡Correcto! 😊");
      setProgress(progress + 1);
      setIsVerified(true);
    } else {
      setFeedback("Incorrecto. 😢 Inténtalo de nuevo.");
    }
  };

  const handleScenarioOption = (option: string) => {
    if (option === currentActivity.correctAnswer) {
      setFeedback("¡Correcto! 😊");
      setProgress(progress + 1);
      setIsVerified(true);
    } else {
      setFeedback("Incorrecto. 😢 Inténtalo de nuevo.");
    }
  };

  const handleReadAndUnderstood = () => {
    setIsVerified(true);
  };

  const nextStep = () => {
    if (currentStep === 0) {
      // Si estamos en el paso de microaprendizaje, avanzar a la primera actividad
      setCurrentStep(1);
    } else {
      const nextIndex = activities.findIndex(
        (activity) => activity.id === currentActivity.id
      ) + 1;
      if (nextIndex < activities.length) {
        setCurrentActivity(activities[nextIndex]);
        setFeedback("");
        setUserAnswer("");
        setIsVerified(false); // Resetear el estado de verificación
      } else {
        setShowAchievement(true);
      }
    }
  };

  if (showAchievement) {
    return <AchievementScreen timeElapsed={timeElapsed} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-gray-800">
      <NavBar title="Microaprendizaje de Liderazgo" />
      <motion.div className="max-w-4xl mx-auto mt-6 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {[...Array(activities.length)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-xl mx-1 ${
                  index < progress ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-lg font-medium">Progreso: {progress}/{activities.length}</p>
          <p className="text-lg font-medium">Tiempo restante: {timeLeft}s</p>
        </div>

        <Card className="rounded-xl shadow-lg p-6 bg-white">
          <CardContent>
            {currentStep === 0 ? (
              // Contenido de microaprendizaje
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4">
                  Introducción al Liderazgo
                </h2>
                <p className="text-lg mb-4">
                  El liderazgo es la capacidad de guiar y motivar a un equipo para alcanzar objetivos comunes.
                  Un buen líder inspira a los demás, fomenta la colaboración y actúa con integridad.
                </p>
                <p className="text-lg">
                  En las siguientes actividades, pondrás a prueba tus conocimientos sobre lo que implica ser
                  un buen líder. ¡Buena suerte!
                </p>
                <Button
                  onClick={handleReadAndUnderstood}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-transform transform hover:scale-105"
                >
                  He leído y comprendido
                </Button>
              </motion.div>
            ) : (
              // Actividades
              <>
                <motion.h2
                  className="text-2xl font-semibold mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentActivity.question}
                </motion.h2>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  {currentActivity.type === "multiple-choice" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentActivity.options.map((option) => (
                        <Button
                          key={option}
                          onClick={() => handleMultipleChoice(option)}
                          className="p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}

                  {currentActivity.type === "fill-in-the-blank" && (
                    <>
                      <Textarea
                        placeholder="Escribe tu respuesta aquí..."
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 focus:border-blue-400"
                        disabled={isVerified}
                      />
                      <Button
                        onClick={handleFillInTheBlank}
                        className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                        disabled={isVerified}
                      >
                        Verificar
                      </Button>
                    </>
                  )}

                  {currentActivity.type === "video" && (
                    <VideoActivity
                      videoUrl={currentActivity.videoUrl}
                      question={currentActivity.question}
                      handleAnswer={handleVideoAnswer}
                    />
                  )}

                  {currentActivity.type === "scenario" && (
                    <ScenarioActivity
                      options={currentActivity.options}
                      handleOptionClick={handleScenarioOption}
                    />
                  )}

                  {feedback && (
                    <div className="mt-4 text-lg font-medium flex items-center">
                      {feedback.includes("Correcto") ? (
                        <FaCheckCircle className="text-green-500 mr-2" />
                      ) : (
                        <FaTimesCircle className="text-red-500 mr-2" />
                      )}
                      {feedback}
                    </div>
                  )}
                </motion.div>
              </>
            )}

            <Button
              onClick={nextStep}
              className="mt-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-transform transform hover:scale-105"
              disabled={!isVerified} // Deshabilitar el botón hasta que se verifique la actividad
            >
              Siguiente
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}