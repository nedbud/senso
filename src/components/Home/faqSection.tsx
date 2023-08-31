'use client'

import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "Why don’t more people use hearing aids ?",
    answer:
      "A recent report from the National Academy of Sciences (NAS) cited cost as one of the primary reasons for poor hearing aid adoption rates. With the average retail price for a new pair of hearing aids, it’s no wonder more people don’t seek the help they so desperately need.",
  },
  {
    question: "Why do hearing aids cost so much ?",
    answer:
      "When you visit a hearing expert’s office to purchase hearing aids, the price you pay covers the cost of the hearing aids, but also covers the cost of your hearing aid fitting and the cost of future professional services . While some customers require numerous fine-tuning and counseling sessions with their provider, others require less assistance, effectively throwing money down the drain on an insurance policy they’ll never use.",
  },
  {
    question: "Why do hearing aids at HearStore cost less ?",
    answer:
      "At HearStore, we enable our customers to get exactly the level of care they need by purchasing custom-tailored aftercare plans. We don’t want to charge you for services you won’t use, and you shouldn’t want to pay for them! Our basic plan includes a hearing test, hearing aid fitting, and in-person learning session covering everything you need to know to succeed with your new hearing aids. For those that need additional appointments for fine-tuning or further instruction, we allow purchasing additional years (1, 2, or 3 years) of follow-up care. By unbundling the device and service we put you in control of your journey to better hearing, and more importantly your wallet! Every one of our hearing aid customers receives unlimited assistance  from our friendly customer service team via online chat, email, and phone. Need adjustments to your hearing aids? One of our hearing aid experts is happy to adjust your hearing aids for you remotely, using our simple ReTune Service",
  },
  {
    question: "How serious are we about saving you money ?",
    answer:
      "We are confident that our hearing aid fitting program is the most affordable in the Bangladesh. In fact, we guarantee it. . If you can find a more affordable rate for an in-person hearing aid fitting (for a hearing aid model listed on our website), we will match the price and include discount to reward your discovery.",
  },
];

export default function FAQ() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl p-2 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl divide-gray-900/10">
          <h2 className="text-center lg:text-left text-xl lg:text-3xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="lg:mt-10 divide-gray-900/10 ">
            {faqs.map((faq) => (
              <Disclosure
                as="div"
                key={faq.question}
                className="p-2 m-2 lg:p-4 lg:m-4 border rounded-md"
              >
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-xs lg:text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-4 lg:h-6 w-4 lg:w-6 bg-red-700 text-white rounded-full"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-4 lg:h-6 w-4 lg:w-6 bg-red-700 text-white rounded-full"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-2 lg:pr-12">
                      <p className="text-xs lg:text-base leading-5 lg:leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
