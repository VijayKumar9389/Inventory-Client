import React, { useEffect, useState } from 'react';
import { getAllCustomerQuestions, updateCustomerQuestionRepliedStatus} from "../../services/customer-questions.services.ts";
import { CustomerQuestionDTO} from "../../models/customer-question.models.ts";
import SectionHeader from "../../components/SectionHeader/SeactionHeader.tsx";
// import './CustomerQuestions.scss';

const CustomerQuestions: React.FC = () => {
    const [questions, setQuestions] = useState<CustomerQuestionDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getAllCustomerQuestions();
                setQuestions(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch customer questions.');
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const handleRepliedToggle = async (id: number, currentStatus: boolean) => {
        try {
            // Toggle the replied status by passing the new value directly
            const updatedQuestion = await updateCustomerQuestionRepliedStatus(id, !currentStatus);

            // Update the state with the newly updated question
            setQuestions((prevQuestions) =>
                prevQuestions.map((question) =>
                    question.id === updatedQuestion.id ? updatedQuestion : question
                )
            );
        } catch (err) {
            setError('Failed to update the question status.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="section">
            <SectionHeader title={"Customer Questions"} />
            <div className="panel">
            <div className="table-wrapper">
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Interest</th>
                    <th>Question</th>
                    <th>Replied</th>
                </tr>
                </thead>
                <tbody>
                {questions.map((question) => (
                    <tr key={question.id}>
                        <td>{question.name}</td>
                        <td>{question.email}</td>
                        <td>{question.interest}</td>
                        <td>{question.question}</td>
                        <td>
                            <input
                                type="checkbox"
                                checked={question.replied}
                                onChange={() => handleRepliedToggle(question.id, question.replied)}
                                className="replied-checkbox"
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            </div>
        </div>
    );
};

export default CustomerQuestions;